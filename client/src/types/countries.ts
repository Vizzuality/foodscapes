export interface Country {
  id: number;
  value: number;
  label: string;
  geojson: GeoJSON.FeatureCollection;
  bbox: [number, number, number, number];
}
