import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { RisksClimateData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useClimateRisks } from 'hooks/risks-climate-change';

import { ClimateRiskChartTooltip } from 'containers/datasets/risks-climate-change/chart/tooltips';

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
  const { data: climateRiskData } = useClimateRisks();

  const filters = useRecoilValue(filtersSelector('climateRisk'));

  const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // DATA
  const { data } = useData<RisksClimateData>({
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
        id: c.id === 0 ? -1 : c.id,
        value: d[c.value] / total,
      };
    });
  }, [climateRiskData, data]);

  // SCALES
  const colorScale = useMemo(() => {
    return scaleOrdinal<string | number, string>({
      domain: DATA.map((e) => e.id),
      range: ['transparent', '#BF8370'],
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
