import { PieProps } from '@visx/shape/lib/shapes/Pie';

type PieChartData = {
  id: number;
  label: string;
  value: number;
};

export interface PieChartProps<T> {
  data: PieChartData[];
  selected?: readonly PieChartData['id'][];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colorScale: ScaleOrdinal<string, string, never>;
  pieProps?: PieProps<T>;
  format: Intl.NumberFormat.format;
  onPathMouseClick?: (data: PieChartData) => void;
  onPathMouseEnter?: (data: PieChartData) => void;
  onPathMouseLeave?: (data: PieChartData) => void;
}
