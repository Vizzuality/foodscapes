from pathlib import Path

import click
import numpy as np
import pandas as pd
import rasterio as rio
from rasterio import shutil as rio_shutil, MemoryFile
from rich import print, status
from rio_cogeo import cog_translate, cog_profiles


@click.command(help="Create a multiband COG or tif from multiple tif files")
@click.argument("files", nargs=-1, type=click.Path(exists=True, path_type=Path))
@click.argument("output", nargs=1, type=click.Path(path_type=Path))
@click.option(
    "--nodata", type=int, help="set no data value. This will also replace the old no data values with the new one."
)
@click.option("--use-cog-driver", is_flag=True, help="Make output a cog using the gdal driver")
@click.option(
    "--description-file",
    "description_file",
    type=click.Path(exists=True, path_type=Path),
    help="Use the band description csv to set the band metadata and order",
)
@click.option("--co", "creation_options", type=str, multiple=True, help="GDAL creation options like 'COMPRESS=DEFLATE'")
@click.option("--add-mask", is_flag=True, help="Add a mask band to the output")
def main(
    files: tuple[Path],
    output: Path,
    nodata: int | None,
    use_cog_driver: bool,
    description_file: Path | None,
    creation_options: list,
    add_mask: bool,
):
    creation_options = dict(param.split("=") for param in creation_options)
    description_table, files = filter_and_order_band_list(description_file, files)
    print_execution_description(use_cog_driver, files, nodata, output)
    stacked_raster, dest_kwargs = stack_bands(files, nodata, description_table)
    dest_kwargs.update(
        {
            "ZOOM_LEVEL_STRATEGY": "upper",
            "overview_resampling": "nearest",
            "warp_resampling": "nearest",
            "blocksize": 512,
        }
    )
    if use_cog_driver:
        indicator = status.Status("Converting to COG using gdal driver...", spinner="earth", refresh_per_second=5)
        indicator.start()
        dest_kwargs.update(creation_options)
        dest_kwargs.update({"driver": "COG", "TILING_SCHEME": "GoogleMapsCompatible"})
        with stacked_raster.open() as src:
            rio_shutil.copy(src, output, **dest_kwargs)
            indicator.stop()
            print("Done")
    else:
        indicator = status.Status("Converting to custom COG with rio cogeo...", spinner="earth", refresh_per_second=5)
        indicator.start()
        # Forcing interleaving to BAND makes the resuling multiband COG much faster to read and
        # operate by rio-tiler. It is what we want because we will always read single bands from the
        # multiband COG.
        dest_kwargs.update({"interleave": "BAND"})
        with stacked_raster.open() as src:
            output_profile = cog_profiles.get("raw")
            output_profile.update(
                {k: v for k, v in dest_kwargs.items() if k in ["blockxsize", "blockysize", "compress", "interleave"]},
            )
            output_profile.update(creation_options)
            gdal_config = dict(
                GDAL_NUM_THREADS=4,
                GDAL_TIFF_INTERNAL_MASK=True,  # dunno if these are needed but they are in the rio cogeo docs
                GDAL_TIFF_OVR_BLOCKSIZE=str(512),
            )
            cog_translate(
                src,
                output,
                output_profile,
                nodata=dest_kwargs.pop("nodata"),
                dtype=dest_kwargs.pop("dtype"),
                web_optimized=True,
                zoom_level=5,  # todo: make this a parameter or calculate it
                in_memory=False,
                forward_band_tags=True,
                forward_ns_tags=True,
                quiet=True,
                config=gdal_config,
                add_mask=add_mask,
            )
            indicator.stop()
            print("Done")


def stack_bands(files: list[Path], nodata: int, description_table: pd.DataFrame | None) -> tuple[MemoryFile, dict]:
    """Join all files from list into a MemoryFile with multiple bands"""
    with rio.open(files[0]) as src:
        # read first file and use it as template for the metadata
        dest_kwargs = src.meta.copy()
        first_crs = src.crs
    dest_kwargs.update(
        {
            "driver": "GTiff",
            "interleave": "BAND",
            "tiled": True,
            "blockxsize": 512,
            "blockysize": 512,
            "compress": "DEFLATE",
            "nodata": nodata,
            "count": len(files),
            "dtype": "float32",
        }
    )
    temp_file = MemoryFile()
    with temp_file.open(**dest_kwargs) as dest:
        indicator = status.Status("Collecting bands and writing nodata: ", spinner="moon")
        indicator.start()
        for i, file in enumerate(files):
            indicator.update(f"Collecting bands and writing nodata: {file.name}", spinner="moon")
            band_idx = i + 1
            with rio.open(file) as src:
                if src.crs != first_crs:
                    raise ValueError(
                        f"file {file} has a different CRS " f" from {files[0]} with {src.crs} and {first_crs}"
                    )
                band_data = src.read(1, masked=True)
                if (nodata is not None) & (src.nodata != nodata):
                    band_data.fill_value = nodata

                if description_table is not None:
                    row: pd.DataFrame
                    row = description_table.loc[description_table["file_name"] == Path(file).name]
                    tags = row.iloc[0].to_dict()
                    tags.update({"min": band_data.min(), "max": band_data.max()})
                    dest.update_tags(bidx=band_idx, **tags)
                    dest.set_band_description(band_idx, row["widget_column"].squeeze())
                else:
                    # just set band name as filename
                    # todo: will we use this script without csv file ever again? -> delete if/else branch
                    dest.set_band_description(band_idx, Path(file).stem)

                dest.write(band_data.filled(), band_idx)
        indicator.stop()
    return temp_file, dest_kwargs


def filter_and_order_band_list(description_file: Path | None, files: tuple[Path]) -> tuple[pd.DataFrame | None, [Path]]:
    if not description_file:
        # todo: will we use this script without csv file ever again? -> delete if/else branch
        return None, files
    description_table = pd.read_csv(description_file, index_col=0).sort_values(by="COG_band")
    # use the provided description file to: use only the rasters defined in it and order the bands
    fname_order = description_table[["COG_band", "file_name"]].set_index("file_name").squeeze().to_dict()
    files_to_keep = [f for f in files if f.name in fname_order]

    # check that all files described in the description file are present in the sources
    available_file_names = {f.name for f in files}
    for file in fname_order.keys():
        if file not in available_file_names:
            print(f"[yellow]WARNING[/yellow]: File {file} described in the description file not present in the sources")
    return description_table, sorted(files_to_keep, key=lambda path: fname_order[path.name])


def print_execution_description(cog: bool, files: tuple[Path], nodata: int | None, output: Path):
    """Just displays what the command is about to do
    Can help to avoid a catastrophe in the case of messing the args up
    """
    print(f"[bold]About to stack the following files{' as multiband COG' if cog else ' multiband GTiff'}:[/bold]")
    print("\n".join("\t" + Path(str(f)).name for f in files))
    print(f"Into: {Path(output).resolve()}")
    if nodata is not None:
        print(f"And replace [bold]nodata[/bold] with: {nodata}")
    else:
        print("Nodata will be kept as it is in each file.")
    click.confirm("Do you want to continue?", abort=True)


if __name__ == "__main__":
    main()
