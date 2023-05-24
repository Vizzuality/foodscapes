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
    | 'locations'
    | 'countries'
    | 'provinces';
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
