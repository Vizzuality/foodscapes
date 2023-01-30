from pathlib import Path

import numpy as np
import rasterio as rio
import click
from rasterio import MemoryFile, DatasetReader
from rasterio import shutil as rio_shutil
from tqdm import tqdm
from rich import print
from rio_cogeo import cog_profiles, cog_translate


@click.command(help="Create a multiband COG or tif from multiple tif files")
@click.argument("files", nargs=-1, type=click.Path(exists=True))
@click.argument("output", nargs=1, type=click.Path())
@click.option(
    "--nodata", type=int, help="set no data value. This will also replace the old no data values with the new one."
)
@click.option("--cog", is_flag=True, help="Make output a cog")
def main(files: tuple[click.Path], output: click.Path, nodata: int | None, cog: bool):
    print(f"[bold]About to stack the following files{' as multiband COG' if cog else ' multiband GTiff'}:[/bold]")
    print("\n".join("\t" + Path(str(f)).name for f in files))
    print(f"Into: {Path(output).resolve()}")
    if nodata is not None:
        print(f"[bold]And replace nodata with:[/bold] {nodata}")
    else:
        print("Nodata will be kept as it is")
    click.confirm("Do you want to continue?", abort=True)

    src: DatasetReader
    with rio.open(files[0]) as src:
        # read first file and use it as template for the metadata
        dest_kwargs = src.meta.copy()
        first_crs = src.crs
    dest_kwargs.update(**cog_profiles.get("deflate"))
    dest_kwargs.update(nodata=nodata, count=len(files), interleave="band", dtype="float32")

    with MemoryFile().open(**dest_kwargs) as mem_dst:
        print("Collecting bands and writing nodata...")
        pbar = tqdm(files)
        for i, file in enumerate(pbar):
            with rio.open(file) as src:
                if src.crs != first_crs:
                    raise ValueError(
                        f"file {file} has a different CRS " f" from {files[0]} with {src.crs} and {first_crs}"
                    )
                band = src.read(1)
                if (nodata is not None) & (src.nodata != nodata):
                    # print(f"Replacing {src.nodata} with {nodata} in {file}")
                    band = np.where(band == src.nodata, nodata, band)

                mem_dst.write(band, i + 1)
                mem_dst.set_band_description(i + 1, Path(file).stem)
        if cog:
            print("Converting to COG...")
            # TODO: find the way to do it fine grained with the gdal ?
            # Since GDAL 3.2 includes the COG driver rio cogeo doesn't make that much sense
            cog_translate(
                mem_dst, output, dest_kwargs, in_memory=True, quiet=False, web_optimized=True, use_cog_driver=True
            )
        else:
            print(f"Writing file {output} ...")
            rio_shutil.copy(mem_dst, output, **dest_kwargs)


if __name__ == "__main__":
    main()
