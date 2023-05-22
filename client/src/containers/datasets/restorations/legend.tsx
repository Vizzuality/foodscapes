import { useMemo } from 'react';

import CHROMA from 'chroma-js';

import { Dataset } from 'types/datasets';

import { useStatisticsData } from 'hooks/data';
import { COLORS, useRestorations } from 'hooks/restorations';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeGradient from 'components/map/legend/types/gradient/component';
import { ColorHex } from 'types';

import { useLegend } from './hooks';

export interface RestorationsLegendProps extends LegendItemProps<'restorations'> {
  dataset: Dataset;
}

const RestorationsLegend = (props: RestorationsLegendProps) => {
  const { settings, filters, dataset } = props;

  const {
    data: restorationsData,
    isPlaceholderData: restorationsIsPlaceholderData,
    isFetching: restorationsIsFetching,
    isFetched: restorationsIsFetched,
    isError: restorationsIsError,
  } = useRestorations();

  const band = useMemo(() => {
    return restorationsData.find((v) => v.column === settings.column)?.value;
  }, [restorationsData, settings]);

  const {
    //
    data: restorationStatisticsData,
    isPlaceholderData: restorationStatisticsIsPlaceholderData,
    isFetching: restorationStatisticsIsFetching,
    isFetched: restorationStatisticsIsFetched,
    isError: restorationStatisticsIsError,
  } = useStatisticsData({ band, filters });

  // DATA
  const legend = useLegend({ dataset, settings });

  const ITEMS = useMemo(() => {
    return (
      CHROMA
        //
        .scale(COLORS)
        .colors(10)
        .map((color: ColorHex, i: number) => {
          const { max } = restorationStatisticsData;

          return {
            color,
            value: null,
            ...(i === 0 && { value: 0 }),
            ...(i === 9 && { value: `${Math.round(max)} ha` }),
          };
        })
    );
  }, [restorationStatisticsData]);

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        <LegendContent
          skeletonClassName="h-7"
          isPlaceholderData={
            restorationStatisticsIsPlaceholderData || restorationsIsPlaceholderData
          }
          isFetching={restorationStatisticsIsFetching || restorationsIsFetching}
          isFetched={restorationStatisticsIsFetched && restorationsIsFetched}
          isError={restorationStatisticsIsError || restorationsIsError}
        >
          <LegendTypeGradient items={ITEMS} />
        </LegendContent>
      </div>
    </LegendItem>
  );
};

export default RestorationsLegend;
