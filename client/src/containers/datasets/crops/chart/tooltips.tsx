import { forwardRef } from 'react';

import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';

import { CropChartData } from 'types/crops';

import { useCrops } from 'hooks/crops';

import { TooltipProps } from 'components/charts/horizontal-stacked-bar';

export const CropsChartTooltip = forwardRef<HTMLDivElement, TooltipProps<CropChartData>>(
  ({ id, bar, total }, ref) => {
    const { data: cropsData } = useCrops();

    const f = cropsData.find((d) => d.value === id);
    if (!f) return null;

    const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const percentage = formatPercentage(bar.data[id] / total);

    return (
      <div
        ref={ref}
        className="relative max-w-[180px] space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
      >
        <h3 className="text-[8px] font-bold uppercase">{f.label}</h3>
        <span>{percentage}</span>
      </div>
    );
  }
);

CropsChartTooltip.displayName = 'CropsChartTooltip';

interface CropsChartTooltipGroupProps extends Omit<BarGroupBar<number>, 'key' | 'value'> {
  id: number;
  total: number;
  label: string;
  color: string;
  bar: SeriesPoint<CropChartData>;
}

export const CropsChartTooltipGroup = forwardRef<HTMLDivElement, CropsChartTooltipGroupProps>(
  ({ id, bar, label, total }, ref) => {
    const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const percentage = formatPercentage(bar.data[id] / total);

    return (
      <div
        ref={ref}
        className="relative max-w-[180px] space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
      >
        <h3 className="text-[8px] font-bold uppercase">{label}</h3>
        <span>{percentage}</span>
      </div>
    );
  }
);

CropsChartTooltipGroup.displayName = 'CropsChartTooltipGroup';
