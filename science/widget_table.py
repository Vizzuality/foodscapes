import os
from datetime import date
from pathlib import Path

import click
import rioxarray
import pandas as pd
from rich import print
from rich.progress import track


def create_df_from_rasters(data: dict) -> pd.DataFrame:
    """Create DataFrame from rasters"""
    for n, items in track(enumerate(data.items())):
        da = rioxarray.open_rasterio(items[1])
        da = da.squeeze("band")

        da.name = items[0]
        df_tmp = da.to_dataframe().drop(columns=["band", "spatial_ref"]).reset_index()

        if n == 0:
            df = df_tmp
        else:
            df[items[0]] = df_tmp[items[0]]

    return df


@click.command(help="Creates a table with the data required for populating the widgets.")
@click.argument("files", nargs=-1, type=click.Path(exists=True, path_type=Path))
@click.argument("description_file", type=click.Path(exists=True, path_type=Path))
@click.option("--output_path", type=click.Path(path_type=Path))
def main(files: list[Path], description_file: Path, output_path: Path):
    # Read description file
    description_table = pd.read_csv(description_file, index_col=0)

    # Create a dictionary with column names as keys and file names as values
    column_file_dict = description_table[["widget_column", "file_name"]].set_index("widget_column").squeeze().to_dict()

    # Create a dictionary with column names as keys and file paths as values
    column_paths_dict = {}
    for column, file in column_file_dict.items():
        paths = [path for path in files if file in str(path)]
        if len(paths) == 0:
            print(f"[yellow]WARNING[/yellow]: File {file} described in the description file not present in the sources")
        else:
            column_paths_dict[column] = paths[0]

    # Create DataFrame from rasters
    df = create_df_from_rasters(column_paths_dict)

    # Fix values
    # replace 0 intensity value with -9999 where foodscapes = -9999
    if "intensity_groups" in column_paths_dict.keys():
        null_idexes = df[df["foodscapes"] == -9999].index
        df.loc[null_idexes, "intensity_groups"] = -9999
    # change data type and shift crop values 1
    if "crops" in column_paths_dict.keys():
        df["crops"].fillna(-9999, inplace=True)
        df["crops"] = df["crops"].apply(lambda x: x + 1 if x != -9999 else x)
        df["crops"] = df["crops"].astype("int16")
    # change data type
    if "crop_groups" in column_paths_dict.keys():
        df["crop_groups"] = df["crop_groups"].astype("int16")

    # Remove pixels with nodata value foodscapes
    df = df.drop(columns=["x", "y"])
    df = df[df["foodscapes"] != -9999]

    # Replace -9999 with 0 in risk columns
    risk_columns = list(description_table[description_table["section"] == "risks"]["widget_column"])
    df[risk_columns] = df[risk_columns].replace(-9999, 0)

    # Pivot DataFrame
    filter_columns = list(
        description_table[description_table["section"].isin(["foodscapes", "risks", "locations"])]["widget_column"]
    )
    continuous_columns = list(description_table[description_table["section"].isin(["opportunities"])]["widget_column"])
    mean_columns = [element for element in continuous_columns if element.endswith("_fraq")]
    sum_columns = [element for element in continuous_columns if element not in mean_columns]

    # note we are just counting pixels here. We should sum the area of each pixel which will vary by latitude
    pivot_count = df.reset_index().groupby(filter_columns).index.count().reset_index(name="pixel_count")
    # mean variables
    pivot_mean = df[filter_columns + mean_columns].groupby(filter_columns).mean().reset_index()
    # sum variables
    pivot_sum = df[filter_columns + sum_columns].groupby(filter_columns).sum().reset_index()

    pivot = pd.concat(
        [pivot_count, pivot_mean.drop(columns=filter_columns), pivot_sum.drop(columns=filter_columns)], axis=1
    )

    pivot = pivot[list(description_table["widget_column"]) + ["pixel_count"]]

    # Save data
    day = str(date.today()).replace("-", "")
    pivot.reset_index().rename(columns={"index": "id"}).to_csv(
        os.path.join(output_path, f"foodscapes_filter_table_{day}_00.csv"), index=False
    )
    pivot.reset_index().rename(columns={"index": "id"}).to_parquet(
        os.path.join(output_path, f"foodscapes_filter_table_{day}_00.parquet"), index=False
    )


if __name__ == "__main__":
    main()
