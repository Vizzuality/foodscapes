import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { FiltersOmitProps, FoodscapeIntensityData } from 'types/data';
import { FoodscapeIntensityChartData } from 'types/foodscapes-intensities';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import HorizontalStackedBar from 'components/charts/horizontal-stacked-bar';

import { FoodscapesIntensitiesChartTooltip } from './tooltips';

interface FoodscapesIntensitiesChartParentProps {
  interactive?: boolean;
  selected?: readonly number[];
  ignore?: FiltersOmitProps;
  onBarClick?: (key: number) => void;
}
interface FoodscapesIntensitiesChartProps extends FoodscapesIntensitiesChartParentProps {
  width: number;
  height: number;
}

const FoodscapesIntensitiesChart = ({
  width,
  height,
  interactive,
  selected,
  ignore = 'intensities',
  onBarClick,
}: FoodscapesIntensitiesChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  // DATA
  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const { data } = useData<FoodscapeIntensityData>('foodscapes-intensities', filters);

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);
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
        const { color } = foodscapesIntensitiesData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [foodscapesIntensitiesData, KEYS]);

  const handleBarClick = useCallback(
    (
      bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<FoodscapeIntensityChartData>;
        key: number;
      }
    ) => {
      const { key } = bar;
      if (onBarClick) onBarClick(key);
    },
    [onBarClick]
  );

  return (
    <HorizontalStackedBar<FoodscapeIntensityData, FoodscapeIntensityChartData>
      data={data}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      xScale={xScale}
      yScale={yScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
      TooltipComponent={FoodscapesIntensitiesChartTooltip}
    />
  );
};

const FoodscapesIntensitiesChartParent = (props: FoodscapesIntensitiesChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => (
        <FoodscapesIntensitiesChart {...props} width={width} height={height} />
      )}
    </ParentSize>
  );
};

export default FoodscapesIntensitiesChartParent;
