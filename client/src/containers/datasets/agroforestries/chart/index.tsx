import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, AgroforestriesData } from 'types/data';

import { useAgroforestries } from 'hooks/agroforestries';
import { useData } from 'hooks/data';
import { formatHA } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';

interface AgroforestriesChartParentProps {
  selected?: readonly number[];
  ignore: FiltersOmitProps;
  onBarClick?: (bar) => void;
}

interface AgroforestriesChartProps extends AgroforestriesChartParentProps {
  width: number;
  height: number;
}

const AgroforestriesChart = ({ selected, ignore = null, onBarClick }: AgroforestriesChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  const { data: agroforestriesData } = useAgroforestries();

  // DATA
  const { data } = useData<AgroforestriesData>('agroforestries', filters);

  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    if (!data) return [];

    return agroforestriesData
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
  }, [agroforestriesData, data]);

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
        const { color } = agroforestriesData.find((d) => d.column === key) || {};
        return color;
      }),
    });
  }, [agroforestriesData, KEYS]);

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

const AgroforestriesChartParent = (props: AgroforestriesChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <AgroforestriesChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default AgroforestriesChartParent;
