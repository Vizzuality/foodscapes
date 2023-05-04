import { useMemo } from 'react';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';

import PieChart from 'components/charts/pie/component';

interface RisksChartParentProps {
  selected?: boolean;
}

interface RisksChartProps extends RisksChartParentProps {
  width: number;
  height: number;
}

const PIE_DATA = [
  {
    id: 'a',
    label: 'Amazing',
    value: 70.5,
  },
  {
    id: 'b',
    label: 'Elegant',
    value: 35,
  },
];

const RisksChart = ({ width, height }: RisksChartProps) => {
  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: PIE_DATA.map((e) => e.id),
      range: ['#BF8370', 'transparent'],
    });
  }, []);
  return (
    <PieChart width={width} height={height} data={PIE_DATA} colorScale={colorScale} selected="a" />
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
