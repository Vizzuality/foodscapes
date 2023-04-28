import { useCallback, useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { scaleLinear, scaleOrdinal } from '@visx/scale';
import { useRecoilValue } from 'recoil';

import { CropData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';
import { useIsLoading } from 'hooks/utils';

import HorizontalBar from 'components/charts/horizontal-bar';
import Loading from 'components/loading';

interface CropsTopChartProps {
  dataset: Dataset;
  selected?: readonly number[];
  onBarClick?: (key: number) => void;
}

const CropsTopChart = ({ dataset, onBarClick }: CropsTopChartProps) => {
  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const fQuery = useCrops();

  const sql = dataset.widget.sql
    //
    .clone()
    .order('value', false)
    .limit(5);

  const dQuery = useData<CropData>({
    sql,
    shape: 'array',
    ...filters,
  });

  const { isFetching, isFetched } = useIsLoading([fQuery, dQuery]);
  const { data: cropsData } = fQuery;
  const { data } = dQuery;

  // CONFIG
  const KEYS = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const DATA = useMemo(() => {
    // Loop through the data and add the label
    return data.map((d) => {
      const { label } = cropsData.find((f) => f.value === d.id) || {};
      return { ...d, label };
    });
  }, [data, cropsData]);

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
        const { color } = cropsData.find((d) => d.value === key) || {};
        return color;
      }),
    });
  }, [cropsData, KEYS]);

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
        onBarClick={handleBarClick}
      />
    </>
  );
};

export default CropsTopChart;
