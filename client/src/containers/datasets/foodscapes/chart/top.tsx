import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import HorizontalBar from 'components/charts/horizontal-bar';

interface FoodscapesTopChartProps {
  dataset: Dataset;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const FoodscapesTopChart = ({ dataset, onBarClick }: FoodscapesTopChartProps) => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));

  // DATA
  const { data: foodscapesData } = useFoodscapes();
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
      const { label } = foodscapesData.find((f) => f.value === d.id) || {};
      return { ...d, label };
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
    <HorizontalBar<FoodscapeData & { label: string }>
      data={DATA}
      xScale={xScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
    />
  );
};

export default FoodscapesTopChart;
