import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { PollutionRiskData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { usePollutionRisks } from 'hooks/pollution-risks';

import { PollutionRiskChartTooltip } from 'containers/datasets/pollution-risk/chart/tooltips';

import PieChart from 'components/charts/pie/component';
import { PieChartData } from 'components/charts/pie/types';

interface RisksChartParentProps {
  dataset: Dataset;
  selected?: readonly number[];
  onPieClick?: (data: PieChartData) => void;
}

interface RisksChartProps extends RisksChartParentProps {
  width: number;
  height: number;
}

const RisksChart = ({ width, height, dataset, selected, onPieClick }: RisksChartProps) => {
  const filters = useRecoilValue(filtersSelector('pollutionRisk'));

  const { data: pollutionRiskData } = usePollutionRisks();

  // DATA
  const { data } = useData<PollutionRiskData>({
    sql: dataset.widget.sql,
    shape: 'array',
    ...filters,
  });

  const DATA = useMemo(() => {
    if (!data) return [];

    const d = data.reduce(
      (acc, curr) => {
        return {
          '1': curr.risk + acc['1'],
          '-1': curr.not_risk + acc['-1'],
        };
      },
      {
        '1': 0,
        '-1': 0,
      }
    );

    const total = d[-1] + d[1];

    return pollutionRiskData.map((c) => {
      return {
        ...c,
        id: c.value,
        value: d[c.value] / total,
        color: c.color,
      };
    });
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
