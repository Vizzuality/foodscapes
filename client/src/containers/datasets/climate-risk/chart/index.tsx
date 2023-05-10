import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { ClimateRiskData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useClimateRisks } from 'hooks/climate-risks';
import { useData } from 'hooks/data';

import { ClimateRiskChartTooltip } from 'containers/datasets/climate-risk/chart/tooltips';

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
  const filters = useRecoilValue(filtersSelector('climateRisk'));

  const { data: climateRiskData } = useClimateRisks();

  // DATA
  const { data } = useData<ClimateRiskData>({
    sql: dataset.widget.sql,
    shape: 'array',
    ...filters,
  });

  const DATA = useMemo(() => {
    if (!data) return [];

    const d = data.reduce(
      (acc, curr) => {
        return {
          '1': curr.risked + acc['1'],
          '-1': curr.not_risked + acc['-1'],
        };
      },
      {
        '1': 0,
        '-1': 0,
      }
    );

    const total = d[-1] + d[1];

    return climateRiskData.map((c) => {
      return {
        ...c,
        id: c.value,
        value: d[c.value] / total,
        color: c.color,
      };
    });
  }, [climateRiskData, data]);

  const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // SCALES
  const colorScale = useMemo(() => {
    return scaleOrdinal<string | number, string>({
      domain: DATA.map((e) => e.id),
      range: ['transparent', '#F0A38B'],
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
      TooltipComponent={ClimateRiskChartTooltip}
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