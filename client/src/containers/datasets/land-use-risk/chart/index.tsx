import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { LandUseRiskData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';

import HorizontalBar from 'components/charts/horizontal-bar';

interface LandUseRiskChartParentProps {
  dataset: Dataset;
  selected?: readonly number[];
}

interface LandUseRiskChartProps extends LandUseRiskChartParentProps {
  width: number;
  height: number;
}

const LandUseRiskChart = ({ dataset }: LandUseRiskChartProps) => {
  const filters = useRecoilValue(filtersSelector('climateRisk'));

  const { data: climateRiskData } = useLandUseRisks();

  // DATA
  const { data } = useData<LandUseRiskData>({
    sql: dataset.widget.sql,
    shape: 'array',
    ...filters,
  });

  const d1 = useMemo(() => {
    if (!data) return null;

    return data.reduce((acc, d) => {
      return {
        ...acc,
        ...d,
      };
    }, {});
  }, [data]);

  const KEYS = useMemo(() => {
    return Object.keys(d1).map((k) => k);
  }, [d1]);

  const DATA = useMemo(() => {
    if (!d1) return [];

    return climateRiskData
      .map((c) => {
        return {
          ...c,
          id: c.value,
          value: d1[c.column],
          color: c.color,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [climateRiskData, d1]);

  const MAX = Math.max(...DATA.map((d) => d.value));

  // const { format: formatPercentage } = new Intl.NumberFormat('en-US', {
  //   style: 'percent',
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 2,
  // });

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, MAX],
      range: [0, 100],
      round: true,
    });
  }, [MAX]);

  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: KEYS.map((key) => key.toString()),
      range: KEYS.map((key) => {
        const { color } = climateRiskData.find((d) => d.column === key) || {};
        return color;
      }),
    });
  }, [climateRiskData, KEYS]);

  const handleBarClick = useCallback(() => {
    // TODO
  }, []);

  return (
    <HorizontalBar
      data={DATA}
      xScale={xScale}
      colorScale={colorScale}
      interactive={false}
      onBarClick={handleBarClick}
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
