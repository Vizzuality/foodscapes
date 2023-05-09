import { PieProps } from '@visx/shape/lib/shapes/Pie';

type PieChartData = {
  id: number;
  label: string;
  value: number;
};

export type TooltipProps<T> = {
  position: { x: number; y: number } | null;
  value: number;
  label: string;
} & T;
export interface PieChartProps<T, C> {
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
  TooltipComponent: FC<TooltipProps<C>>;
  onPathMouseClick?: (data: PieChartData) => void;
  onPathMouseEnter?: (data: PieChartData) => void;
  onPathMouseLeave?: (data: PieChartData) => void;
}
