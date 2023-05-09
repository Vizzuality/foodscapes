import { forwardRef } from 'react';

import { RisksClimateData } from 'types/data';

import { TooltipProps } from 'components/charts/pie/types';

export const ClimateRiskChartTooltip = forwardRef<HTMLDivElement, TooltipProps<RisksClimateData>>(
  (props, ref) => {
    // const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    //   style: 'percent',
    //   minimumFractionDigits: 0,
    //   maximumFractionDigits: 2,
    // });

    // const percentage = formatPercentage(bar.data[id] / total);

    return (
      <div
        ref={ref}
        className="relative max-w-[180px] space-y-1 border border-navy-500/25 bg-white p-1 text-navy-500 shadow-md"
      >
        <h3 className="text-[8px] font-bold uppercase">Hello</h3>
        <span>number</span>
      </div>
    );
  }
);

ClimateRiskChartTooltip.displayName = 'ClimateRiskChartTooltip';
