import dynamic from 'next/dynamic';

import Wrapper from 'containers/wrapper';

const BarChart = dynamic(() => import('components/charts/bar-chart'), { ssr: false });
const BarStack = dynamic(() => import('components/charts/bar-stack'), { ssr: false });

const data = [
  {
    label: 'Sad',
    value: 2000,
  },
  {
    label: 'Anxious',
    value: 7000,
  },
];

const stackData = [
  { key: 'A', type: 't1', value: 20 },
  { key: 'A', type: 't2', value: 12 },
  { key: 'A', type: 't3', value: 5 },
  { key: 'B', type: 't1', value: 5 },
  { key: 'B', type: 't2', value: 22 },
  { key: 'B', type: 't3', value: 14 },
  { key: 'C', type: 't1', value: 18 },
  { key: 'C', type: 't2', value: 21 },
  { key: 'C', type: 't3', value: 9 },
];

const ChartPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex h-small-screen items-center bg-navy-500">
        <BarChart
          width={300}
          height={300}
          data={data}
          margin={{ top: 20, left: 20, bottom: 20, right: 20 }}
        />
        <BarStack
          width={300}
          height={400}
          data={stackData}
          margin={{ top: 8, left: 32, bottom: 32, right: 8 }}
        />
      </div>
    </Wrapper>
  );
};

export default ChartPage;
