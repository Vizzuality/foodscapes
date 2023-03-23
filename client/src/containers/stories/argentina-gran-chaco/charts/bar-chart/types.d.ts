export type BarChartData = {
  label: string;
  value: number;
};

export interface BarChartProps {
  data: BarChartData[];
  margin?: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  width: number;
  height: number;
  events?: boolean;
}
