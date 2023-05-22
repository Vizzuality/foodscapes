import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, PollutionRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { usePollutionRisks } from 'hooks/pollution-risks';

import { PollutionRiskChartTooltip } from 'containers/datasets/pollution-risks/chart/tooltips';

import PieChart from 'components/charts/pie/component';
import { PieChartData } from 'components/charts/pie/types';

interface RisksChartParentProps {
  selected?: readonly number[];
  ignore: FiltersOmitProps;
  onPieClick?: (data: PieChartData) => void;
}

interface RisksChartProps extends RisksChartParentProps {
  width: number;
  height: number;
}

const RisksChart = ({
  width,
  height,
  selected,
  ignore = 'pollutionRisk',
  onPieClick,
}: RisksChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  const { data: pollutionRiskData } = usePollutionRisks();

  // DATA
  const { data } = useData<PollutionRiskData>('pollution-risks', filters);

  const DATA = useMemo(() => {
    if (!data || !data.length) return [];

    const total = data.reduce((acc, d) => acc + d.value, 0);

    return pollutionRiskData
      .map((c) => {
        const d1 = data.find((d) => d.id === c.id);

        return {
          ...c,
          id: c.value,
          value: d1.value / total,
          color: c.color,
        };
      })
      .filter((c) => c.value > 0);
  }, [pollutionRiskData, data]);

  const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // SCALES
  const colorScale = useMemo(() => {
    return scaleOrdinal<string | number, string>({
      domain: DATA.map((e) => e.id),
      range: DATA.map((e) => e.color),
    });
  }, [DATA]);

  return (
    <PieChart
      width={width}
      height={height}
      data={DATA}
      colorScale={colorScale}
      format={formatPercentage}
      selected={selected}
      TooltipComponent={PollutionRiskChartTooltip}
      onPathMouseClick={onPieClick}
    />
  );
};

const RisksChartParent = (props: RisksChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <RisksChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default RisksChartParent;
