import { useMemo } from 'react';

import { ParentSize } from '@visx/responsive';
import { scaleOrdinal } from '@visx/scale';

import { RisksClimateData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';

import PieChart from 'components/charts/pie/component';

interface RisksChartParentProps {
  dataset: Dataset;
  selected?: boolean;
}

interface RisksChartProps extends RisksChartParentProps {
  width: number;
  height: number;
}

const RisksChart = ({ width, height, dataset }: RisksChartProps) => {
  // DATA
  const { data } = useData<RisksClimateData>({
    sql: dataset.widget.sql,
    shape: 'array',
    // ...filters,
  });

  const RISKS_FORMATING = useMemo(() => {
    if (!data)
      return {
        risked: 0,
        not_risked: 0,
      };

    return data.reduce(
      (acc, curr) => {
        return {
          risked: curr.risked + acc.risked,
          not_risked: curr.not_risked + acc.not_risked,
        };
      },
      {
        risked: 0,
        not_risked: 0,
      }
    );
  }, [data]);

  const CLIMATE_RISKS = useMemo(() => {
    if (!RISKS_FORMATING)
      return [
        {
          id: 'risked',
          label: 'risked',
          value: 0,
        },
        {
          id: 'not-risked',
          label: 'not-risked',
          value: 0,
        },
      ];

    return [
      {
        id: 'risked',
        label: 'risked',
        value: RISKS_FORMATING.risked,
      },
      {
        id: 'not-risked',
        label: 'not-risked',
        value: RISKS_FORMATING.not_risked,
      },
    ];
  }, [RISKS_FORMATING]);
  console.log(data.find((d) => d.risked));
  console.log({ CLIMATE_RISKS });

  // SCALES
  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: CLIMATE_RISKS.map((e) => e.id),
      range: ['#BF8370', 'transparent'],
    });
  }, [CLIMATE_RISKS]);
  return (
    <PieChart
      width={width}
      height={height}
      data={CLIMATE_RISKS}
      colorScale={colorScale}
      selected="a"
    />
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
