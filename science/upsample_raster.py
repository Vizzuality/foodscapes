from pathlib import Path

import click
import numpy as np
import rasterio
from rasterio import MemoryFile, shutil
from rasterio.enums import Resampling
from rasterio.vrt import WarpedVRT
from tqdm import tqdm


def upscale(file: Path, upscale_factor: int = 2) -> MemoryFile:
    """Upscales raster to an aligned exact division.

    Also divides the values by the suqre of the upscale factor.

    +---+---+
    |1/4|1/4|
    +---+---+
    |1/4|1/4|
    +---+---+
    """
    nodata: int = 0
    with rasterio.open(file) as src:
        # upscale the data to a perfect aligned partition of 1/4
        # use nearest resampling so new pixels have the exact value as the
        # "parent" pixel. Then divide by 4 to get the exact proportional value
        upscale_height = int(src.height * upscale_factor)
        upscale_width = int(src.width * upscale_factor)
        data = src.read(out_shape=(src.count, upscale_height, upscale_width), resampling=Resampling.nearest)
        # divide each pixel value by the square of the factor
        data = np.where(data == src.nodata, nodata, data)
        data /= upscale_factor**2
        # scale image transform
        upscale_transform = src.transform * src.transform.scale(
            (src.width / data.shape[-1]), (src.height / data.shape[-2])
        )
        upscale_kwargs = src.meta.copy()

    upscale_kwargs.update(
        {"transform": upscale_transform, "height": upscale_height, "width": upscale_width, "nodata": nodata}
    )
    mem_file = MemoryFile()
    with mem_file.open(**upscale_kwargs) as dest:
        dest.write(data)
    return mem_file


@click.command(help="Upscale raster files according to a given reference file.")
@click.argument("files", nargs=-1, type=click.Path(exists=True))
@click.option(
    "--suffix",
    "-s",
    "suffix",
    type=str,
    default="-res",
    help="Sufix to append to the filename of the resampled raster file (defaults to '-res')",
)
@click.option(
    "--output_dir",
    "-o",
    "out_dir",
    required=True,
    type=Path,
    help="Output directory where to create all the resampled raster files",
)
@click.option(
    "--reference",
    "-r",
    "ref_file",
    required=True,
    type=click.Path(exists=True),
    help="Reference file to align rasters with",
)
def main(files: list[Path], suffix: str, ref_file: Path, out_dir: Path):
    """ Upsample a raster

    Works by applying first a controlled upsample by partitioning the original pixel by 4
    and scaling the data by 4. Then it is downsampled using a weighted `sum` to correct resolution.

    Why? Call me and I will explain it to you
    TODO: FIX DOCUMENTATION
    """
    with rasterio.open(ref_file) as ref:
        dst_crs = ref.crs
        dst_transform = ref.transform
        dst_height = ref.height
        dst_width = ref.width
        dst_profile = ref.profile.copy()

    # downscaling parameters
    vrt_options = {
        "resampling": Resampling.sum,
        "crs": dst_crs,
        "transform": dst_transform,
        "height": dst_height,
        "width": dst_width,
    }

    out_dir.mkdir(exist_ok=True)

    pbar = tqdm(files)
    for file in pbar:
        file = Path(file)
        pbar.set_description(file.name)
        with upscale(file).open() as upscaled_raster:
            with WarpedVRT(upscaled_raster, **vrt_options) as vrt:
                outfile = out_dir / (file.stem + suffix + file.suffix)
                dst_profile.update(
                    dtype=upscaled_raster.profile["dtype"],
                    nodata=upscaled_raster.profile["nodata"],
                    count=upscaled_raster.profile["count"],
                )
                rasterio.shutil.copy(vrt, outfile, **dst_profile)


if __name__ == "__main__":
    main()
