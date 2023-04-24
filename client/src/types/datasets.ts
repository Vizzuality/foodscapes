import { Select } from 'squel';
export interface Dataset {
  id: string;
  label: string;
  group: string;
  layer: {
    enabled: boolean;
    visible: boolean;
    band?: number;
  };
  widget: {
    enabled: boolean;
    sql?: Select;
  };
}
