import { forwardRef } from 'react';

import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';

import { CropChartData } from 'types/crops';

import { useCrops } from 'hooks/crops';
import { convertPixelCountToHA } from 'hooks/utils';

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

CropsChartTooltip.displayName = 'CropsChartTooltip';

interface CropsChartTooltipGroupProps extends BarGroupBar<number> {
  id: number;
  total: number;
  partialTotal?: number;
  label: string;
  color: string;
  bar: SeriesPoint<CropChartData>;
}

export const CropsChartTooltipGroup = forwardRef<HTMLDivElement, CropsChartTooltipGroupProps>(
  ({ id, bar, label, total, partialTotal }, ref) => {
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
          <div>{percentage}</div>
        </div>

        {!!partialTotal && (
          <>
            <h3 className="text-[8px] font-bold uppercase">Selected</h3>
            <span>{formatPercentage(partialTotal)}</span>
          </>
        )}
      </div>
    );
  }
);

CropsChartTooltipGroup.displayName = 'CropsChartTooltipGroup';
