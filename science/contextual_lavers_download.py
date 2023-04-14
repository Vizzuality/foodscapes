import os
import shutil
import datetime
import urllib.request
import zipfile
from tqdm import tqdm

import pandas as pd
import geopandas as gpd

data_folder = 'data/contextual_layers/'
if not os.path.exists(os.path.join(data_folder, 'raw')):
    os.makedirs(os.path.join(data_folder, 'raw'))
    
now = datetime.datetime.now()
month_name = now.strftime("%b")
year = now.year

date = f"{month_name}{year}"

file_name = os.path.join(data_folder, 'raw', f"WDPA_WDOECM_{date}_Public_all_shp.zip")
url = f"https://d1gam3xoknrgr2.cloudfront.net/current/WDPA_WDOECM_{date}_Public_all_shp.zip"

# Download the file with progress bar
with tqdm(unit='B', unit_scale=True, unit_divisor=1024, miniters=1, desc=url.split('/')[-1]) as t:
    urllib.request.urlretrieve(url, filename=file_name, reporthook=lambda x, y, z: t.update(y))

# Extract the contents of the zip file
with zipfile.ZipFile(file_name, 'r') as zip_ref:
    zip_ref.extractall(os.path.join(data_folder, 'raw'))
    
# Read and process shapefile
file_name = os.path.join(data_folder, 'raw', f'WDPA_WDOECM_{date}_Public_all_shp_1.zip')
with zipfile.ZipFile(file_name, 'r') as zip_ref:
    zip_ref.extractall(os.path.join(data_folder, 'raw'))
    shp_file = [f for f in zip_ref.namelist() if f.endswith('.shp')][0]
    with tqdm(total=1, desc=f'Reading and simplifying shapefile') as pbar:
        df = gpd.read_file(os.path.join(data_folder, 'raw', shp_file), callback=lambda x: pbar.update(1))
        df = df.to_crs('epsg:4326')
        df['geometry'] = df['geometry'].simplify(tolerance=0.001, 
                                                preserve_topology=True)
        df = df[['WDPAID', 'NAME', 'IUCN_CAT', 'STATUS', 'DESIG_TYPE',
                    'GOV_TYPE', 'OWN_TYPE', 'MANG_AUTH', 'geometry']]

# Use shutil.rmtree to remove the data_folder and all its contents
shutil.rmtree(os.path.join(data_folder, 'raw'))

# Save the final GeoDataFrame as a GeoJSON file
output_file = os.path.join(data_folder, 'protected_areas.geojson')
df.to_file(output_file, driver='GeoJSON')
    
