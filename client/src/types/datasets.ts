type Toolbar = {
  download: boolean;
  info: boolean;
  layer: boolean;
};

export interface Dataset {
  id:
    | 'foodscapes'
    | 'foodscapes-summary'
    | 'foodscapes-intensities'
    | 'crops'
    | 'land-use-risks'
    | 'climate-risks'
    | 'pollution-risks'
    | 'restorations'
    | 'agroforestries'
    | 'soil-healths'
    | 'locations'
    | 'countries'
    | 'provinces'
    | 'irrecoverable-carbon'
    | 'deprivation-index'
    | 'protected-areas'
    | 'river-basins'
    | 'case-studies';
  label: string;
  labelGroup?: string;
  group: string;
  layer: {
    enabled: boolean;
    visible: boolean;
    band?: number;
    bands?: number[];
  };
  widget: {
    enabled: boolean;
    toolbar: Toolbar;
  };
}
