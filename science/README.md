# Data preparation
This doc explains how to go from raw data to the final COG.
It consists of 3 scripts:
1. `calc_carbon_seq.py` which multiplies intervention's area
suitability rasters by carbon coefficients to get the carbon sequestration potential per pixel.
2. `upsample_raster.py` To upsample the intervention rasters from 5 arcmin to 0.05 degrees.
3. `make_cog.py` The one and only. This takes a list of rasters and a description csv to use as
metadata source and band order.

In order to end with a correct COG one needs to have all the data sources on hand. There is no 
real need to have them like this, but I recommend something in the lines of.
```
data
├── country
│  ├── country.tif
│  └── province.tif
├── crop
│  ├── SPAM_DominantCrop_5km.tif
│  └── SPAM_DominantCropGroup_5km.tif
├── foodscapes
│  ├── Foodscapes_combinedGEOTIFF_final.tif
│  ├── Foodscapes_combinedGEOTIFF_intensity.tif
│  └── soil_groups.tif
├── interventions
│  ├── area_suitability_raster
│  │  └── ...
│  ├── carbon_coefficient_raster
│  │  └── ...
│  └── carbon_totals 
│     └── ...
├── risks
│  └── ...
└── layers_definition.csv

```
⚠ **Check that the filenames in the definition file match your locals** 

All the data can be found in the gdrive of the project alongside with the layers csv.

## Run the thing

You need an environment (python) with rasterio, pandas, rich, click... _TODO: write a requirements.txt_

All  the scripts have a nice* `--help` ;).

First! compute the **carbon sequestration** per pixel at native resolution (before resampling) with:
```shell
python calc_carbon_seq.py --nodata 0 \
    --area data/interventions/area_suitability_raster \
    --carbon data/interventions/carbon_coefficient_raster \
    --out data/interventions/carbon_totals
```

⚠ **Careful with the nodata. We should be using -1 (don't trust).**

Second! UPsample the intervention rasters to the correct resolution using a reference file.
```shell
python upsample_raster.py \
  -r data/foodscapes/Foodscapes_combinedGEOTIFF_final.tif \
  -o data/interventions/res/ \
  data/interventions/area_suitability_raster/*.tif data/interventions/carbon_totals/*.tif
```

Third! Squeeze everything into a single COG with 30ish bands like so:
```shell
python make_cog.py --add-mask --nodata -1 \
  --description-file data/layers_20230215_00.csv \
  data/foodscapes/*.tif data/crop/*.tif data/risks/*.tif data/interventions/res/*.tif data/country/country.tif data/country/province.tif \
  data/foodscapes_cog_<YYYYMMDD>_<XX>.tif
```
In `stack_raster.py` the last argument is the output COG name, but check the `--help` for more.

Fourth! Convert everything into a single `DataFrame` with 30ish columns like so:
```shell
python widget_table.py \
data/foodscapes/*.tif data/crop/*.tif data/risks/*.tif data/interventions/res/*.tif data/country/*.tif \
data/layers_<YYYYMMDD>_<XX>.csv \
--output_path data/
```