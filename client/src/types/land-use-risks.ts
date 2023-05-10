export interface LandUseRisk {
  id: number;
  label: string;
  color: string;
  column:
    | 'soil_erosion'
    | 'water_scarcity'
    | 'critically_endangered_ecosystems'
    | 'area_with_high_conservation_value'
    | 'agricultural_frontier_zones';
  value: 6 | 7 | 8 | 9 | 10;
}
