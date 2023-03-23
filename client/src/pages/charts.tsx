import dynamic from 'next/dynamic';

import Wrapper from 'containers/wrapper';

const BarChart = dynamic(() => import('components/charts/bar-chart'), { ssr: false });
const BarStack = dynamic(() => import('components/charts/bar-stack'), { ssr: false });

const data = [
  {
    label: 'Grazing systems',
    value: 5,
  },
  {
    label: 'Mixed livestock cropping systems',
    value: 140,
  },
];

const stackData = [
  { key: 'A', name: 'Current Farm Benefits', type: 't1', value: 20 },
  { key: 'A', name: 'Current Farm Benefits', type: 't2', value: 0 },
  { key: 'A', name: 'Current Farm Benefits', type: 't3', value: 0 },
  { key: 'B', name: 'Benefits after interventions', type: 't1', value: 20 },
  { key: 'B', name: 'Benefits after interventions', type: 't2', value: 10 },
  { key: 'B', name: 'Benefits after interventions', type: 't3', value: 6 },
];

const ChartPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex h-small-screen items-center bg-navy-500">
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
        />

        <BarStack
          width={600}
          height={300}
          data={stackData}
          margin={{ top: 20, left: 20, bottom: 50, right: 20 }}
        />
      </div>
    </Wrapper>
  );
};

export default ChartPage;
