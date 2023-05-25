import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';
import { convertPixelCountToHA, formatPercentage, useIsLoading } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';
import Loading from 'components/loading';

interface FoodscapesIntensitiesTopChartProps {
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const FoodscapesIntensitiesTopChart = ({ onBarClick }: FoodscapesIntensitiesTopChartProps) => {
  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const fQuery = useFoodscapesIntensities();
  const dQuery = useData<FoodscapeIntensityData>('foodscapes-intensities', filters);

  const { isFetching, isFetched } = useIsLoading([fQuery, dQuery]);
  const { data: foodscapesIntensitiesData } = fQuery;
  const { data } = dQuery;

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const TOTAL = useMemo(() => {
    return data.reduce((acc, d) => acc + d.value, 0);
  }, [data]);

  const DATA = useMemo(() => {
    // Loop through the data and add the label
    return data
      .map((d) => {
        const { label } = foodscapesIntensitiesData.find((f) => f.value === d.id) || {};
        return { ...d, label };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [data, foodscapesIntensitiesData]);

  const MAX = Math.max(...DATA.map((d) => d.value));

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, MAX],
      range: [5, 100],
      round: true,
    });
  }, [MAX]);

  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: KEYS.map((key) => key.toString()),
      range: KEYS.map((key) => {
        const { color } = foodscapesIntensitiesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesIntensitiesData, KEYS]);

  const handleBarClick = useCallback(
    (bar: FoodscapeIntensityData) => {
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

      <HorizontalBar<FoodscapeIntensityData & { label: string }>
        data={DATA}
        xScale={xScale}
        colorScale={colorScale}
        interactive={false}
        format={(d) => `${convertPixelCountToHA(d)} | ${formatPercentage(d / TOTAL)}`}
        onBarClick={handleBarClick}
      />
    </>
  );
};

export default FoodscapesIntensitiesTopChart;
