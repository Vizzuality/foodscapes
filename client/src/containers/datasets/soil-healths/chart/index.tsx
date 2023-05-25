import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, SoilHealthsData } from 'types/data';

import { useData } from 'hooks/data';
import { useSoilHealths } from 'hooks/soil-healths';
import { formatHA } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';

interface SoilHealthsChartParentProps {
  selected?: readonly number[];
  ignore: FiltersOmitProps;
  onBarClick?: (bar) => void;
}

interface SoilHealthsChartProps extends SoilHealthsChartParentProps {
  width: number;
  height: number;
}

const SoilHealthsChart = ({ selected, ignore = null, onBarClick }: SoilHealthsChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  const { data: soilHealthsData } = useSoilHealths();

  // DATA
  const { data } = useData<SoilHealthsData>('soil-healths', filters);

  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    if (!data) return [];

    return soilHealthsData
      .map((c) => {
        const d1 = data.find((d) => d.id === c.column);
        if (!d1) return null;

        return {
          ...c,
          id: c.value,
          value: d1.value,
          color: c.color,
        };
      })
      .filter((d) => d)
      .sort((a, b) => b.value - a.value);
  }, [soilHealthsData, data]);

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
        const { color } = soilHealthsData.find((d) => d.column === key) || {};
        return color;
      }),
    });
  }, [soilHealthsData, KEYS]);

  return (
    <HorizontalBar
      data={DATA}
      xScale={xScale}
      colorScale={colorScale}
      interactive={false}
      selected={selected}
      format={formatHA}
      onBarClick={onBarClick}
    />
  );
};

const SoilHealthsChartParent = (props: SoilHealthsChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <SoilHealthsChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default SoilHealthsChartParent;
