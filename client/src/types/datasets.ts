import { Select } from 'squel';

type Toolbar = {
  download: boolean;
  info: boolean;
  layer: boolean;
};

export interface Dataset {
  id: string;
  label: string;
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
