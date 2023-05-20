import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, FoodscapeData } from 'types/data';
import { FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import HorizontalStackedBar from 'components/charts/horizontal-stacked-bar';

import { FoodscapesChartTooltip } from './tooltips';

interface FoodscapesChartParentProps {
  interactive?: boolean;
  selected?: readonly number[];
  ignore?: FiltersOmitProps;
  onBarClick?: (key: number) => void;
}
interface FoodscapesChartProps extends FoodscapesChartParentProps {
  width: number;
  height: number;
}

const FoodscapesChart = ({
  width,
  height,
  interactive,
  selected,
  ignore = 'foodscapes',
  onBarClick,
}: FoodscapesChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  // DATA
  const { data: foodscapesData } = useFoodscapes();
  const { data } = useData<FoodscapeData>('foodscapes', filters);

  // CONFIG
  const KEYS = useMemo(() => {
    return data.sort((a, b) => a.parent_id - b.parent_id).map((d) => d.id);
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo(() => {
    return data.sort((a, b) => a.parent_id - b.parent_id);
  }, [data]);

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
        const { color } = foodscapesData.find((d) => d.value === key) || {};
        return color;
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
    <HorizontalStackedBar<FoodscapeData, FoodscapeChartData>
      data={DATA}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      xScale={xScale}
      yScale={yScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
      TooltipComponent={FoodscapesChartTooltip}
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
