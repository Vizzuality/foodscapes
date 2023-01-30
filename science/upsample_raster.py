from pathlib import Path

import click
import numpy as np
import rasterio
from rasterio import MemoryFile, shutil
from rasterio.enums import Resampling
from rasterio.vrt import WarpedVRT
from tqdm import tqdm


def disaggregate(file: Path, factor: int = 2) -> MemoryFile:
    """Downscales (or upsample) raster

    by splitting pixels into factor^2 pixels and accordingly scaling the value

    For example a pixel of value 1 disaggregated using a factor of 2 will yield:
    +---+---+
    |1/4|1/4|
    +---+---+
    |1/4|1/4|
    +---+---+
    """
    nodata: int = 0
    with rasterio.open(file) as src:
        new_height = int(src.height * factor)
        new_width = int(src.width * factor)
        # use nearest resampling so new pixels have the exact value as the "parent" pixel.
        # Then divide by factor^2 to get the exact proportional value for the new pixels
        data = src.read(out_shape=(src.count, new_height, new_width), resampling=Resampling.nearest)
        # TODO: mask nodata to keep original nodata or add parameter to change it on demand
        # deal with nodata to avoid overflows
        data = np.where(data == src.nodata, nodata, data)
        data /= factor ** 2
        upscale_transform = src.transform * src.transform.scale(
            (src.width / data.shape[-1]), (src.height / data.shape[-2])
        )
        upscale_kwargs = src.meta.copy()
    upscale_kwargs.update(
        {"transform": upscale_transform, "height": new_height, "width": new_width, "nodata": nodata}
    )
    mem_file = MemoryFile()
    with mem_file.open(**upscale_kwargs) as dest:
        dest.write(data)
    return mem_file


def check_sum(original: Path, resampled: Path) -> float:
    with rasterio.open(original) as orig_dataset, rasterio.open(resampled) as res_dataset:
        orig_data = orig_dataset.read()
        res_data = res_dataset.read()
        orig_sum = np.where(orig_data == orig_dataset.nodata, 0, orig_data).sum()
        res_sum = np.where(res_data == res_dataset.nodata, 0, res_data).sum()
        return round(100 * (orig_sum - res_sum) / orig_sum, 6)


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
@click.option("--check", is_flag=True, help="Compute the rasters sum to check if resampling worked well", )
def main(files: list[Path], suffix: str, ref_file: Path, out_dir: Path, check: bool):
    """ Upsample a raster
    Works by applying first a disaggregation (upsampling) by partitioning the original pixel by a factor
    so that the resulting pixels are smaller than the target pixel size. Then rescale (downsample)
    to the desired pixel size by applying a weighted sum. This way we can upsample any raster with absolute values
    to any small pixel size and maintain the proportions of the values per pixel. It should result in a raster that has
    the same `sum()` value.

    TODO: Mask resampled files with the reference so that they have the same data pixels
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
        with disaggregate(file).open() as upscaled_raster:
            with WarpedVRT(upscaled_raster, **vrt_options) as vrt:
                outfile = out_dir / (file.stem + suffix + file.suffix)
                dst_profile.update(
                    dtype=upscaled_raster.profile["dtype"],
                    nodata=upscaled_raster.profile["nodata"],
                    count=upscaled_raster.profile["count"],
                )
                rasterio.shutil.copy(vrt, outfile, **dst_profile)
        if check:
            pbar.write(f"Resampling error: {check_sum(file, outfile)} % ")


if __name__ == "__main__":
    main()
