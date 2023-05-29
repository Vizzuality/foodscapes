import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { group } from 'd3-array';
import { useRecoilValue } from 'recoil';

import { CropData } from 'types/data';
import { LayerSettings } from 'types/layers';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';
import { convertPixelCountToHA, formatPercentage, useIsLoading } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';
import Loading from 'components/loading';

interface CropsTopChartProps {
  settings: LayerSettings<'crops'>;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const CropsTopChart = ({ settings, onBarClick }: CropsTopChartProps) => {
  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const fQuery = useCrops();
  const dQuery = useData<CropData>('crops', filters);

  const { isFetching, isFetched } = useIsLoading([fQuery, dQuery]);
  const { data: cropsData } = fQuery;
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
          cropsData.find((f) => {
            if (settings.group) {
              return f.parentId === d.id;
            }
            return f.value === d.id;
          }) || {};

        return { ...d, label: settings.group ? parentLabel : label };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [d1, cropsData, settings]);

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
          cropsData.find((d) => {
            if (settings.group) {
              return d.parentId === key;
            }
            return d.value === key;
          }) || {};
        return settings.group ? parentColor : color;
      }),
    });
  }, [settings, cropsData, KEYS]);

  const handleBarClick = useCallback(
    (bar: CropData) => {
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

      <HorizontalBar<CropData & { label: string }>
        data={DATA}
        xScale={xScale}
        interactive={false}
        colorScale={colorScale}
        format={(d) => `${convertPixelCountToHA(d.value)} | ${formatPercentage(d.value / TOTAL)}`}
        onBarClick={handleBarClick}
      />
    </>
  );
};

export default CropsTopChart;
