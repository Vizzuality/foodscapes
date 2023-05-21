import { Select } from 'squel';

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
    | 'land-use-risk'
    | 'climate-risk'
    | 'pollution-risk'
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
    sql?: Select;
    download?: Select;
  };
}
