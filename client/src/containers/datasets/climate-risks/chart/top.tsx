import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';
import { convertPixelCountToHA, useIsLoading } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';
import Loading from 'components/loading';

interface RisksClimateChangeTopChartProps {
  dataset: Dataset;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const RisksClimateChangeTopChart = ({ onBarClick }: RisksClimateChangeTopChartProps) => {
  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const fQuery = useFoodscapes();

  const dQuery = useData<FoodscapeData>('foodscapes', {
    ...filters,
    climateRisk: [1],
    limit: 5,
    sortBy: 'value',
    sortDirection: 'desc',
  });

  const { isFetching, isFetched } = useIsLoading([fQuery, dQuery]);
  const { data: foodscapesData } = fQuery;
  const { data } = dQuery;

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    // Loop through the data and add the label
    return data.map((d) => {
      const { label } = foodscapesData.find((f) => f.value === d.id) || {};
      return { ...d, label, value: convertPixelCountToHA(d.value, 1000000) };
    });
  }, [data, foodscapesData]);

  const MAX = Math.max(...DATA.map((d) => d.value));

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
        const { color } = foodscapesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesData, KEYS]);

  const handleBarClick = useCallback(
    (bar: FoodscapeData) => {
      const { id } = bar;
      if (onBarClick) onBarClick(id);
    },
    [onBarClick]
  );

  return (
    <>
      <Loading
        visible={isFetching && !isFetched}
        className="absolute top-0.5 left-0 h-5 w-full -translate-y-full"
        iconClassName="text-navy-500 h-3 h-3"
      />

      <HorizontalBar<FoodscapeData & { label: string }>
        data={DATA}
        xScale={xScale}
        colorScale={colorScale}
        interactive={false}
        onBarClick={handleBarClick}
      />
    </>
  );
};

export default RisksClimateChangeTopChart;
