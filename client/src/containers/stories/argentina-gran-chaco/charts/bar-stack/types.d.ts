export type GroupBarStackChartData = {
  key: string;
  total: number;
  t1: number;
  t2: number;
  t3: number;
};

export type BarStackChartData = {
  key: string;
  type: string;
  value: number;
  name: string;
};

export interface BarStackChartProps {
  id: string;
  data: BarStackChartData[];
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
