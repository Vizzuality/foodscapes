export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  content: React.ComponentType;
  geojson: GeoJSON.FeatureCollection;
  bbox: [number, number, number, number];
}
