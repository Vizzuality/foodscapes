import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { ClimateRiskData, FiltersOmitProps } from 'types/data';
import { Dataset } from 'types/datasets';

import { useClimateRisks } from 'hooks/climate-risks';
import { useData } from 'hooks/data';

import { ClimateRiskChartTooltip } from 'containers/datasets/climate-risk/chart/tooltips';

import PieChart from 'components/charts/pie/component';
import { PieChartData } from 'components/charts/pie/types';

interface ClimateRiskParentProps {
  dataset: Dataset;
  selected?: readonly number[];
  ignore: FiltersOmitProps;
  onPieClick?: (data: PieChartData) => void;
}

interface ClimateRiskProps extends ClimateRiskParentProps {
  width: number;
  height: number;
}

const ClimateRisk = ({
  width,
  height,
  dataset,
  selected,
  ignore = 'climateRisk',
  onPieClick,
}: ClimateRiskProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  const { data: climateRisksData } = useClimateRisks();

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

    return climateRisksData
      .map((c) => {
        return {
          ...c,
          id: c.value,
          value: d[c.value] / total,
          color: c.color,
        };
      })
      .filter((c) => c.value > 0);
  }, [climateRisksData, data]);

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
      TooltipComponent={ClimateRiskChartTooltip}
      onPathMouseClick={onPieClick}
    />
  );
};

const ClimateRiskParent = (props: ClimateRiskParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <ClimateRisk {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default ClimateRiskParent;
