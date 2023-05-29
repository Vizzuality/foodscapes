import { forwardRef } from 'react';

import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';

import { FoodscapeChartData } from 'types/foodscapes';

import { useFoodscapes } from 'hooks/foodscapes';
import { convertPixelCountToHA } from 'hooks/utils';

import { TooltipProps } from 'components/charts/horizontal-stacked-bar';

export const FoodscapesChartTooltip = forwardRef<HTMLDivElement, TooltipProps<FoodscapeChartData>>(
  ({ id, bar, total }, ref) => {
    const { data: foodscapesData } = useFoodscapes();

    const f = foodscapesData.find((d) => d.value === id);
    if (!f) return null;

    const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const area = convertPixelCountToHA(bar.data[id]);
    const percentage = formatPercentage(bar.data[id] / total);

    return (
      <div
        ref={ref}
        className="relative max-w-[180px] space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
      >
        <div>
          <h3 className="border-b border-navy-200 text-[8px] font-bold uppercase">{f.label}</h3>
          <div>{area}</div>
          <div>{percentage}</div>
        </div>
      </div>
    );
  }
);

FoodscapesChartTooltip.displayName = 'FoodscapesChartTooltip';

interface FoodscapesChartTooltipGroupProps extends BarGroupBar<number> {
  id: number;
  total: number;
  partialTotal?: number;
  label: string;
  color: string;
  bar: SeriesPoint<FoodscapeChartData>;
}

export const FoodscapesChartTooltipGroup = forwardRef<
  HTMLDivElement,
  FoodscapesChartTooltipGroupProps
>(({ id, bar, label, total, partialTotal }, ref) => {
  const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const area = convertPixelCountToHA(bar.data[id]);
  const percentage = formatPercentage(bar.data[id] / total);

  return (
    <div
      ref={ref}
      className="relative max-w-[180px] space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
    >
      <div>
        <h3 className="border-b border-navy-200 text-[8px] font-bold uppercase">{label}</h3>
        <div>{area}</div>
        <span>{percentage}</span>
      </div>

      {!!partialTotal && (
        <>
          <h3 className="text-[8px] font-bold uppercase">Selected</h3>

          <div>{formatPercentage(partialTotal)}</div>
        </>
      )}
    </div>
  );
});

FoodscapesChartTooltipGroup.displayName = 'FoodscapesChartTooltipGroup';
