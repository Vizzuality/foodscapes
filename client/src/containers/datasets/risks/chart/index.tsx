import { useMemo } from 'react';

import { scaleOrdinal } from '@visx/scale';

import PieChart from 'components/charts/pie/component';

interface RisksChartProps {
  selected?: boolean;
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

const RisksChart = ({}: RisksChartProps) => {
  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: PIE_DATA.map((e) => e.id),
      range: ['#BF8370', 'transparent'],
    });
  }, []);

  return (
    <div>
      <PieChart width={250} height={250} data={PIE_DATA} colorScale={colorScale} selected="a" />
    </div>
  );
};

export default RisksChart;
