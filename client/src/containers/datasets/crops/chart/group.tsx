import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { useRecoilValue } from 'recoil';

import { CropChartData, CropGroup } from 'types/crops';
import { CropData, FiltersOmitProps } from 'types/data';

import { useCrops, useCropsGroups } from 'hooks/crops';
import { useData } from 'hooks/data';

import HorizontalStackedGroupedBar from 'components/charts/horizontal-stacked-grouped-bar';

import { CropsChartTooltipGroup } from './tooltips';

interface CropsChartParentProps {
  interactive?: boolean;
  selected?: readonly number[];
  ignore?: FiltersOmitProps;
  onBarClick?: (key: number) => void;
}
interface CropsChartProps extends CropsChartParentProps {
  width: number;
  height: number;
}

const CropsChart = ({
  width,
  height,
  interactive,
  ignore = 'crops',
  selected,
  onBarClick,
}: CropsChartProps) => {
  const filters = useRecoilValue(filtersSelector(ignore));

  // DATA
  const { data: cropsData } = useCrops();
  const { data: cropsGroupsData } = useCropsGroups();

  const { data, error } = useData<CropData>('crops', filters);

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
        const { parentColor } = cropsData.find((d) => d.parentId === key) || {};
        return parentColor;
      }),
    });
  }, [cropsData, KEYS]);

  const handleBarClick = useCallback(
    (
      bar: Omit<BarGroupBar<number>, 'value' | 'key'> & {
        bar: SeriesPoint<CropChartData>;
        key: number;
      }
    ) => {
      const { key } = bar;
      if (onBarClick) onBarClick(key);
    },
    [onBarClick]
  );

  return (
    <HorizontalStackedGroupedBar<CropData, CropGroup, CropChartData>
      data={data}
      groupedData={cropsGroupsData}
      width={width}
      height={height}
      selected={selected}
      interactive={interactive}
      xScale={xScale}
      yScale={yScale}
      colorScale={colorScale}
      onBarClick={handleBarClick}
      TooltipComponent={CropsChartTooltipGroup}
    />
  );
};

const CropsChartParent = (props: CropsChartParentProps) => {
  return (
    <ParentSize>
      {({ width, height }) => <CropsChart {...props} width={width} height={height} />}
    </ParentSize>
  );
};

export default CropsChartParent;
