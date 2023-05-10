import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { LandUseRiskData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';

import { LandUseRiskChartTooltip } from 'containers/datasets/land-use-risk/chart/tooltips';

import PieChart from 'components/charts/pie/component';
import { PieChartData } from 'components/charts/pie/types';

interface LandUseRiskChartParentProps {
  dataset: Dataset;
  selected?: readonly number[];
  onPieClick?: (data: PieChartData) => void;
}

interface LandUseRiskChartProps extends LandUseRiskChartParentProps {
  width: number;
  height: number;
}

const LandUseRiskChart = ({
  width,
  height,
  dataset,
  selected,
  onPieClick,
}: LandUseRiskChartProps) => {
  const filters = useRecoilValue(filtersSelector('climateRisk'));

  const { data: climateRiskData } = useLandUseRisks();

  // DATA
  const { data } = useData<LandUseRiskData>({
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
      TooltipComponent={LandUseRiskChartTooltip}
      onPathMouseClick={onPieClick}
    />
  );
};

const LandUseRiskChartParent = (props: LandUseRiskChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <LandUseRiskChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default LandUseRiskChartParent;
