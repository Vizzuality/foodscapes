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
    value: 700000,
  },
  {
    id: 'b',
    label: 'Elegant',
    value: 3500000,
  },
];

const RisksChart = ({}: RisksChartProps) => {
  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: PIE_DATA.map((e) => e.id),
      range: ['#1428A0', '#D939B2'],
    });
  }, []);

  return (
    <div>
      <PieChart width={250} height={250} data={PIE_DATA} colorScale={colorScale} />
    </div>
  );
};

export default RisksChart;
