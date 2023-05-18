export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  body: string; // markdown
  image: string;
  geojson: GeoJSON.FeatureCollection;
  bbox: [number, number, number, number];
}
