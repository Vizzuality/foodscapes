import { forwardRef } from 'react';

import { FoodscapeIntensityChartData } from 'types/foodscapes-intensities';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { TooltipProps } from 'components/charts/horizontal-stacked-bar';

export const FoodscapesIntensitiesChartTooltip = forwardRef<
  HTMLDivElement,
  TooltipProps<FoodscapeIntensityChartData>
>(({ id, bar, total }, ref) => {
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const f = foodscapesIntensitiesData.find((d) => d.value === id);
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
});

FoodscapesIntensitiesChartTooltip.displayName = 'FoodscapesIntensitiesChartTooltip';
