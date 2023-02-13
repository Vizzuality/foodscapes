import { ReactNode } from 'react';

export interface LegendItemProps {
  id: string;
  name: string | ReactNode;
  description?: string;
  icon?: ReactNode;
}
