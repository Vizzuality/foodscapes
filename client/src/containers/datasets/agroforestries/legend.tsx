import { useMemo } from 'react';

import CHROMA from 'chroma-js';

import { Dataset } from 'types/datasets';

import { COLORS, useAgroforestries } from 'hooks/agroforestries';
import { useBand } from 'hooks/data';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeGradient from 'components/map/legend/types/gradient/component';
import Select from 'components/ui/select/single/component';
import { ColorHex } from 'types';

import { useLegend } from './hooks';

export interface AgroforestriesLegendProps extends LegendItemProps<'agroforestries'> {
  dataset: Dataset;
}

const AgroforestriesLegend = (props: AgroforestriesLegendProps) => {
  const { settings, dataset, onChangeColumn } = props;

  const { format } = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 4,
  });

  const {
    data: agroforestriesData,
    isPlaceholderData: agroforestriesIsPlaceholderData,
    isFetching: agroforestriesIsFetching,
    isFetched: agroforestriesIsFetched,
    isError: agroforestriesIsError,
  } = useAgroforestries();

  const band = useMemo(() => {
    return agroforestriesData.find((v) => v.column === settings.column)?.value;
  }, [agroforestriesData, settings]);

  const {
    //
    data: agroforestriesBandData,
    isPlaceholderData: agroforestriesBandIsPlaceholderData,
    isFetching: agroforestriesBandIsFetching,
    isFetched: agroforestriesBandIsFetched,
    isError: agroforestriesBandIsError,
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
          const { max } = agroforestriesBandData || {};
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return {
            color: CHROMA(color).alpha(opacity).css(),
            value: null,
            ...(i === 0 && { value: `${format(0)} ha` }),
            ...(i === 9 && { value: `${format(max)} ha` }),
          };
        })
    );
  }, [agroforestriesBandData, format]);

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 px-4 pt-0 pb-1">
        <LegendContent
          skeletonClassName="h-7"
          isPlaceholderData={agroforestriesIsPlaceholderData}
          isFetching={agroforestriesIsFetching}
          isFetched={agroforestriesIsFetched}
          isError={agroforestriesIsError}
        >
          <Select
            id="agroforestries-legend-select"
            theme="light"
            size="s"
            options={agroforestriesData.map((v) => ({
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
          isPlaceholderData={agroforestriesBandIsPlaceholderData}
          isFetching={agroforestriesBandIsFetching}
          isFetched={agroforestriesBandIsFetched}
          isError={agroforestriesBandIsError}
        >
          <LegendTypeGradient items={ITEMS} />
        </LegendContent>
      </div>
    </LegendItem>
  );
};

export default AgroforestriesLegend;
