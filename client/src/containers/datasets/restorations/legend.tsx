import { useMemo } from 'react';

import CHROMA from 'chroma-js';

import { Dataset } from 'types/datasets';

import { useBand } from 'hooks/data';
import { COLORS, useRestorations } from 'hooks/restorations';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeGradient from 'components/map/legend/types/gradient/component';
import Select from 'components/ui/select/single/component';
import { ColorHex } from 'types';

import { useLegend } from './hooks';

export interface RestorationsLegendProps extends LegendItemProps<'restorations'> {
  dataset: Dataset;
}

const RestorationsLegend = (props: RestorationsLegendProps) => {
  const { settings, dataset, onChangeColumn } = props;

  const { format } = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 4,
  });

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
    data: restorationBandData,
    isPlaceholderData: restorationBandIsPlaceholderData,
    isFetching: restorationBandIsFetching,
    isFetched: restorationBandIsFetched,
    isError: restorationBandIsError,
  } = useBand({ band });

  // DATA
  const legend = useLegend({ dataset, settings });

  const ITEMS = useMemo(() => {
    return (
      CHROMA
        //
        .scale(COLORS)
        .colors(20)
        .map((color: ColorHex, i: number) => {
          const { max } = restorationBandData || {};
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return {
            color: CHROMA(color).alpha(opacity).css(),
            value: null,
            ...(i === 0 && { value: `${format(0)} ha` }),
            ...(i === 9 && { value: `${format(max)} ha` }),
          };
        })
    );
  }, [restorationBandData, format]);

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 px-4 pt-0 pb-1">
        <LegendContent
          skeletonClassName="h-7"
          isPlaceholderData={restorationsIsPlaceholderData}
          isFetching={restorationsIsFetching}
          isFetched={restorationsIsFetched}
          isError={restorationsIsError}
        >
          <Select
            id="restorations-legend-select"
            theme="light"
            size="s"
            options={restorationsData.map((v) => ({
              label: v.label,
              value: v.column,
            }))}
            value={settings.column}
            onChange={(value: string) => {
              onChangeColumn(value);
            }}
          />
        </LegendContent>

        <LegendContent
          skeletonClassName="h-7"
          isPlaceholderData={restorationBandIsPlaceholderData}
          isFetching={restorationBandIsFetching}
          isFetched={restorationBandIsFetched}
          isError={restorationBandIsError}
        >
          <LegendTypeGradient items={ITEMS} />
        </LegendContent>
      </div>
    </LegendItem>
  );
};

export default RestorationsLegend;
