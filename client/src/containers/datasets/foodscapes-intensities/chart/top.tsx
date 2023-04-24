import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import HorizontalBar from 'components/charts/horizontal-bar';

interface FoodscapesIntensitiesTopChartProps {
  dataset: Dataset;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const FoodscapesIntensitiesTopChart = ({
  dataset,
  onBarClick,
}: FoodscapesIntensitiesTopChartProps) => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));

  // DATA
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();
  const sql = dataset.widget.sql
    //
    .clone()
    .order('value', false)
    .limit(5);

  const { data } = useData<FoodscapeData>({
    sql,
    shape: 'array',
    ...filters,
  });

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    // Loop through the data and add the label
    return data.map((d) => {
      const { label } = foodscapesIntensitiesData.find((f) => f.value === d.id) || {};
      return { ...d, label };
    });
  }, [data, foodscapesIntensitiesData]);

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
        const { color } = foodscapesIntensitiesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesIntensitiesData, KEYS]);

  const handleBarClick = useCallback(
    (bar: FoodscapeData) => {
      const { id } = bar;
      if (onBarClick) onBarClick(id);
    },
    [onBarClick]
  );

  return (
    <HorizontalBar<FoodscapeData & { label: string }>
      data={DATA}
      xScale={xScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
    />
  );
};

export default FoodscapesIntensitiesTopChart;
