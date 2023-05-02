from contextlib import ExitStack
from pathlib import Path

import click
import rasterio as rio
import rasterio.windows
from rasterio import DatasetReader
from rich import print
from rich.progress import track


def multiply_rasters(area_file: Path, carbon_coeff_file: Path, outfile: Path, nodata: int) -> None:
    with ExitStack() as cm:
        area_src: DatasetReader = cm.enter_context(rio.open(area_file))
        carbon_src: DatasetReader = cm.enter_context(rio.open(carbon_coeff_file))
        if carbon_src.crs != area_src.crs:
            print(
                f"[yellow]WARNING[/]: Rasters {area_file.name} and {carbon_coeff_file.name}"
                f" don't have he same CRS:{area_src.crs} vs {carbon_src.crs}"
            )

        # use creation options from the area file
        dest_kwargs = area_src.meta.copy()
        dest_kwargs.update(nodata=nodata)
        dest_src = cm.enter_context(rio.open(outfile, "w", **dest_kwargs))

        area = area_src.read(1, masked=True).filled(nodata)
        # Use windows because the carbon rasters don't have the same shape as the area rasters.
        # (they should be having the same crs even the carbon coefficients are not tagged as 4326)
        # The zone outside the bounds of the carbon raster will be padded with 0s
        # thus working as if both rasters have the same shape
        window = rio.windows.from_bounds(*area_src.bounds, transform=carbon_src.transform)
        carbon = carbon_src.read(1, window=window, boundless=True, fill_value=0, masked=True).filled(nodata)
        res = carbon * area
        dest_src.write(res, indexes=1)


@click.command(
    help="Multiply carbon coefficients with area suitability to get the carbon potential sequestration totals"
)
@click.option("--area", "areas_dir", required=True, type=click.Path(exists=True, path_type=Path))
@click.option("--carbon", "carbon_coefficient_dir", required=True, type=click.Path(exists=True, path_type=Path))
@click.option("--out", "out_dir", required=True, type=click.Path(path_type=Path))
@click.option("--nodata", type=int)
def main(carbon_coefficient_dir: Path, areas_dir: Path, out_dir: Path, nodata: int):
    area_files = [f for f in areas_dir.glob("*.tif") if f.stem.endswith("_ha")]
    for area_file in track(area_files):
        intervention_name = area_file.stem.split("_")[2]  # expecting `area_suit_COVERCROPS_xxxx`
        for carbon_file in carbon_coefficient_dir.glob("*.tif"):
            if intervention_name.lower() == carbon_file.stem.split("_")[1].lower():
                # special case for Silvopasture that is split by ecoregion :(
                ecoregion_suffix = area_file.stem.split("_")[3]
                if ecoregion_suffix.startswith("EcoRegion"):
                    intervention_name = f"{intervention_name}_{ecoregion_suffix}"
                out_name = f"Cseq_{intervention_name}.tif"
                print(f"{out_name}")
                out_dir.mkdir(exist_ok=True)
                multiply_rasters(area_file, carbon_file, out_dir / out_name, nodata)


if __name__ == "__main__":
    main()
