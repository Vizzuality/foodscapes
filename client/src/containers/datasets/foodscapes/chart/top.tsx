import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { group } from 'd3-array';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { LayerSettings } from 'types/layers';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';
import { convertPixelCountToHA, formatPercentage, useIsLoading } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';
import Loading from 'components/loading';

interface FoodscapesTopChartProps {
  settings: LayerSettings<'foodscapes'>;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const FoodscapesTopChart = ({ settings, onBarClick }: FoodscapesTopChartProps) => {
  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const fQuery = useFoodscapes();
  const dQuery = useData<FoodscapeData>('foodscapes', filters);

  const { isFetching, isFetched } = useIsLoading([fQuery, dQuery]);
  const { data: foodscapesData } = fQuery;
  const { data } = dQuery;

  const d1 = useMemo(() => {
    if (settings.group) {
      return Array.from(
        group(data, (d) => d.parent_id),
        ([key, value]) => ({
          id: key,
          value: value.reduce((acc, v) => acc + v.value, 0),
          parent_id: key,
        })
      );
    }

    return data;
  }, [settings, data]);

  // CONFIG
  const KEYS = useMemo(() => {
    return d1.map((d) => d.id);
  }, [d1]);

  const TOTAL = useMemo(() => {
    return d1.reduce((acc, d) => acc + d.value, 0);
  }, [d1]);

  const DATA = useMemo(() => {
    // Loop through the d1 and add the label
    return d1
      .map((d) => {
        const { label, parentLabel } =
          foodscapesData.find((f) => {
            if (settings.group) {
              return f.parentId === d.id;
            }
            return f.value === d.id;
          }) || {};

        return { ...d, label: settings.group ? parentLabel : label };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [d1, foodscapesData, settings]);

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
        const { color, parentColor } =
          foodscapesData.find((d) => {
            if (settings.group) {
              return d.parentId === key;
            }
            return d.value === key;
          }) || {};
        return settings.group ? parentColor : color;
      }),
    });
  }, [settings, foodscapesData, KEYS]);

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
        format={(d) => `${convertPixelCountToHA(d.value)} | ${formatPercentage(d.value / TOTAL)}`}
        onBarClick={handleBarClick}
      />
    </>
  );
};

export default FoodscapesTopChart;
