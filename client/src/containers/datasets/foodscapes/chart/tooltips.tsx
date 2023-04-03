import { forwardRef } from 'react';

import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';

import { FoodscapeChartData } from 'types/foodscapes';

import { useFoodscapes } from 'hooks/foodscapes';

interface FoodscapesChartTooltipProps extends Omit<BarGroupBar<number>, 'key' | 'value'> {
  id: number;
  total: number;
  bar: SeriesPoint<FoodscapeChartData>;
}

export const FoodscapesChartTooltip = forwardRef<HTMLDivElement, FoodscapesChartTooltipProps>(
  ({ id, bar, total }, ref) => {
    const { data: foodscapesData } = useFoodscapes();

    const f = foodscapesData.find((d) => d.value === id);
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

FoodscapesChartTooltip.displayName = 'FoodscapesChartTooltip';

interface FoodscapesChartTooltipGroupProps extends Omit<BarGroupBar<number>, 'key' | 'value'> {
  id: number;
  total: number;
  label: string;
  color: string;
  bar: SeriesPoint<FoodscapeChartData>;
}

export const FoodscapesChartTooltipGroup = forwardRef<
  HTMLDivElement,
  FoodscapesChartTooltipGroupProps
>(({ id, bar, label, total }, ref) => {
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
});

FoodscapesChartTooltipGroup.displayName = 'FoodscapesChartTooltipGroup';
