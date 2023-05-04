import os
import tempfile
from pathlib import Path

import click
import numpy as np
import pandas as pd
import rasterio as rio
from rasterio import shutil as rio_shutil
from rich import print, status
from rio_cogeo import cog_translate
from rio_cogeo.cogeo import TemporaryRasterFile


@click.command(help="Create a multiband COG or tif from multiple tif files")
@click.argument("files", nargs=-1, type=click.Path(exists=True, path_type=Path))
@click.argument("output", nargs=1, type=click.Path(path_type=Path))
@click.option(
    "--nodata", type=int, help="set no data value. This will also replace the old no data values with the new one."
)
@click.option("--use-cog-driver", "cog", is_flag=True, help="Make output a cog")
@click.option(
    "--description-file",
    "description_file",
    type=click.Path(exists=True, path_type=Path),
    help="Use the band description csv to set the band metadata and order",
)
def main(files: tuple[Path], output: Path, nodata: int | None, cog: bool, description_file: Path | None):
    description_table, files = filter_and_order_band_list(description_file, files)
    print_execution_description(cog, files, nodata, output)
    stacked_raster, dest_kwargs = stack_bands(files, nodata, description_table)
    dest_kwargs.update(
        {
            "driver": "COG",
            "TILING_SCHEME": "GoogleMapsCompatible",
            "ZOOM_LEVEL_STRATEGY": "upper",
            "overview_resampling": "nearest",
            "warp_resampling": "nearest",
            "blocksize": 512,
            "interleave": "BAND",
        }
    )
    if cog:
        with rio.open(stacked_raster) as src:
            indicator = status.Status("Converting to COG with gdal driver...", spinner="earth", refresh_per_second=5)
            indicator.start()
            rio_shutil.copy(src, output, **dest_kwargs)
            indicator.stop()
            print("Done")
    else:
        with rio.open(stacked_raster) as src:
            indicator = status.Status("Converting to COG with rio cogeo...", spinner="earth", refresh_per_second=5)
            indicator.start()
            write_params = {
                k: v
                for k, v in dest_kwargs.items()
                if k in ["blockxsize", "blockysize", "interleave", "tiled", "compress"]
            }
            cog_translate(
                src,
                output,
                indexes=dest_kwargs["count"],
                nodata=dest_kwargs["nodata"],
                dtype=dest_kwargs["dtype"],
                web_optimized=True,
                zoom_level_strategy=dest_kwargs["ZOOM_LEVEL_STRATEGY"],
                forward_band_tags=True,
                forward_ns_tags=True,
                dst_kwargs=write_params,
            )
            indicator.stop()
            print("Done")
        os.remove(stacked_raster)


def stack_bands(files: list[Path], nodata: int, description_table: pd.DataFrame | None) -> tuple[str, dict]:
    """Join all files from list into a MemoryFile with multiple bands"""
    with rio.open(files[0]) as src:
        # read first file and use it as template for the metadata
        dest_kwargs = src.meta.copy()
        first_crs = src.crs
    dest_kwargs.update(
        {
            "driver": "GTiff",
            "interleave": "PIXEL",
            "tiled": True,
            "blockxsize": 512,
            "blockysize": 512,
            "compress": "DEFLATE",
            "nodata": nodata,
            "count": len(files),
            "dtype": "float32",
        }
    )
    temp_file = "temp1.tif"
    with rio.open(temp_file, "w", **dest_kwargs) as dest:
        indicator = status.Status("Collecting bands and writing nodata", spinner="moon")
        indicator.start()
        for i, file in enumerate(files):
            band_idx = i + 1
            with rio.open(file) as src:
                if src.crs != first_crs:
                    raise ValueError(
                        f"file {file} has a different CRS " f" from {files[0]} with {src.crs} and {first_crs}"
                    )
                band_data = src.read(1)
                if (nodata is not None) & (src.nodata != nodata):
                    band_data = np.where(band_data == src.nodata, nodata, band_data)

                if description_table is not None:
                    row: pd.DataFrame
                    row = description_table.loc[description_table["file_name"] == Path(file).name]
                    dest.update_tags(bidx=band_idx, **row.iloc[0].to_dict())
                else:
                    # just set band name as filename
                    # todo: will we use this script without csv file ever again? -> delete if/else branch
                    dest.set_band_description(band_idx, Path(file).stem)

                dest.write(band_data, band_idx)
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
