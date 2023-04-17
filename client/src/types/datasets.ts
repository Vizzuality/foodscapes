import { Select } from 'squel';
export interface Dataset {
  id: string;
  label: string;
  group: string;
  layer: {
    enabled: boolean;
  };
  widget: {
    enabled: boolean;
    sql?: Select;
  };
}
