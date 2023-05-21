import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, LandUseRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';
import { convertPixelCountToHA } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';

interface LandUseRiskChartParentProps {
  selected?: readonly number[];
  ignore: FiltersOmitProps;
  onBarClick?: (bar) => void;
}

interface LandUseRiskChartProps extends LandUseRiskChartParentProps {
  width: number;
  height: number;
}

const LandUseRiskChart = ({
  selected,
  ignore = 'landUseRisk',
  onBarClick,
}: LandUseRiskChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  const { data: landUseRisksData } = useLandUseRisks();

  // DATA
  const { data } = useData<LandUseRiskData>('land-use-risks', filters);

  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    if (!data) return [];

    return landUseRisksData
      .map((c) => {
        const d1 = data.find((d) => d.id === c.column);
        if (!d1) return null;

        return {
          ...c,
          id: c.value,
          value: convertPixelCountToHA(d1.value, 1000000),
          color: c.color,
        };
      })
      .filter((d) => d)
      .sort((a, b) => b.value - a.value);
  }, [landUseRisksData, data]);

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
        const { color } = landUseRisksData.find((d) => d.column === key) || {};
        return color;
      }),
    });
  }, [landUseRisksData, KEYS]);

  return (
    <HorizontalBar
      data={DATA}
      xScale={xScale}
      colorScale={colorScale}
      interactive
      selected={selected}
      onBarClick={onBarClick}
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
