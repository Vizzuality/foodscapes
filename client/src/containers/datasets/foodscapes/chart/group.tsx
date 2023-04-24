import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData, FoodscapeGroup } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes, useFoodscapesGroups } from 'hooks/foodscapes';

import HorizontalStackedGroupedBar from 'components/charts/horizontal-stacked-grouped-bar';

import { FoodscapesChartTooltipGroup } from './tooltips';

interface FoodscapesChartParentProps {
  dataset: Dataset;
  interactive?: boolean;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}
interface FoodscapesChartProps extends FoodscapesChartParentProps {
  width: number;
  height: number;
}

const FoodscapesChart = ({
  width,
  height,
  dataset,
  interactive,
  selected,
  onBarClick,
}: FoodscapesChartProps) => {
  const filters = useRecoilValue(filtersSelector('foodscapes'));

  // DATA
  const { data: foodscapesData } = useFoodscapes();
  const { data: foodscapesGroupsData } = useFoodscapesGroups();

  const { data, error } = useData<FoodscapeData>({
    sql: dataset.widget.sql,
    shape: 'array',
    ...filters,
  });

  // CONFIG
  const KEYS = useMemo(() => {
    if (error) return [];

    return [
      ...new Set(
        data //
          .sort((a, b) => a.parent_id - b.parent_id)
          .map((d) => d.parent_id)
      ),
    ];
  }, [data, error]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  // SCALES
  const xScale = useMemo(() => {
    return scaleLinear<number>({
      domain: [0, TOTAL],
      range: [0, width - 4],
      round: true,
    });
  }, [width, TOTAL]);

  const yScale = useMemo(() => {
    return scaleBand<number>({
      domain: [],
      range: [0, height - 4],
    });
  }, [height]);

  const colorScale = useMemo(() => {
    return scaleOrdinal<string, string>({
      domain: KEYS.map((key) => key.toString()),
      range: KEYS.map((key) => {
        const { parentColor } = foodscapesData.find((d) => d.parentId === key) || {};
        return parentColor;
      }),
    });
  }, [foodscapesData, KEYS]);

  const handleBarClick = useCallback(
    (
      bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<FoodscapeChartData>;
        key: number;
      }
    ) => {
      const { key } = bar;
      if (onBarClick) onBarClick(key);
    },
    [onBarClick]
  );

  return (
    <HorizontalStackedGroupedBar<FoodscapeData, FoodscapeGroup, FoodscapeChartData>
      data={data}
      groupedData={foodscapesGroupsData}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      xScale={xScale}
      yScale={yScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
      TooltipComponent={FoodscapesChartTooltipGroup}
    />
  );
};

const FoodscapesChartParent = (props: FoodscapesChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <FoodscapesChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default FoodscapesChartParent;
