import { useMemo } from 'react';

import CHROMA from 'chroma-js';

import { Dataset } from 'types/datasets';

import { useBand } from 'hooks/data';
import { COLORS, useSoilHealths } from 'hooks/soil-healths';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeGradient from 'components/map/legend/types/gradient/component';
import Select from 'components/ui/select/single/component';
import { ColorHex } from 'types';

import { useLegend } from './hooks';

export interface SoilHealthsLegendProps extends LegendItemProps<'soil-healths'> {
  dataset: Dataset;
}

const SoilHealthsLegend = (props: SoilHealthsLegendProps) => {
  const { settings, dataset, onChangeColumn } = props;

  const { format } = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 4,
  });

  const {
    data: soilHealthsData,
    isPlaceholderData: soilHealthsIsPlaceholderData,
    isFetching: soilHealthsIsFetching,
    isFetched: soilHealthsIsFetched,
    isError: soilHealthsIsError,
  } = useSoilHealths();

  const band = useMemo(() => {
    return soilHealthsData.find((v) => v.column === settings.column)?.value;
  }, [soilHealthsData, settings]);

  const {
    //
    data: soilHealthsBandData,
    isPlaceholderData: soilHealthsBandIsPlaceholderData,
    isFetching: soilHealthsBandIsFetching,
    isFetched: soilHealthsBandIsFetched,
    isError: soilHealthsBandIsError,
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
          const { max } = soilHealthsBandData || {};
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return {
            color: CHROMA(color).alpha(opacity).css(),
            value: null,
            ...(i === 0 && { value: `${format(0)} ha` }),
            ...(i === 9 && { value: `${format(max)} ha` }),
          };
        })
    );
  }, [soilHealthsBandData, format]);

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 px-4 pt-0 pb-1">
        <LegendContent
          skeletonClassName="h-7"
          isPlaceholderData={soilHealthsIsPlaceholderData}
          isFetching={soilHealthsIsFetching}
          isFetched={soilHealthsIsFetched}
          isError={soilHealthsIsError}
        >
          <Select
            id="soilHealths-legend-select"
            theme="light"
            size="s"
            options={soilHealthsData.map((v) => ({
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
          isPlaceholderData={soilHealthsBandIsPlaceholderData}
          isFetching={soilHealthsBandIsFetching}
          isFetched={soilHealthsBandIsFetched}
          isError={soilHealthsBandIsError}
        >
          <LegendTypeGradient items={ITEMS} />
        </LegendContent>
      </div>
    </LegendItem>
  );
};

export default SoilHealthsLegend;
