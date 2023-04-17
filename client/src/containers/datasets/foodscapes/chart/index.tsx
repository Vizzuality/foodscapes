import { useCallback, useMemo } from 'react';

import { intensitiesAtom } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';
import { FoodscapeChartData } from 'types/foodscapes';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import HorizontalStackedBar from 'components/charts/horizontal-stacked-bar';

import { FoodscapesChartTooltip } from './tooltips';

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
  const intensities = useRecoilValue(intensitiesAtom);

  // DATA
  const { data: foodscapesData } = useFoodscapes();

  const { data } = useData<FoodscapeData>({
    sql: dataset.widget.sql,
    intensities,
    shape: 'array',
  });

  // CONFIG
  const KEYS = useMemo(() => {
    return data.sort((a, b) => a.soil_groups - b.soil_groups).map((d) => d.id);
  }, [data]);
  const TOTAL = data.reduce((acc, curr) => acc + curr.value, 0);

  const DATA = useMemo(() => {
    return data.sort((a, b) => a.soil_groups - b.soil_groups);
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
    return scaleLinear<string>({
      domain: KEYS,
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
