import { useMemo } from 'react';

import CHROMA from 'chroma-js';

import { Dataset } from 'types/datasets';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeGradient from 'components/map/legend/types/gradient/component';
import { ColorHex } from 'types';

import { BOUNDARIES, COLORS } from './constants';
import { useLegend } from './hooks';

export interface DeprivationIndexLegendProps extends LegendItemProps<'deprivation-index'> {
  dataset: Dataset;
}

const DeprivationIndexLegend = (props: DeprivationIndexLegendProps) => {
  const { settings, dataset } = props;

  // DATA
  const legend = useLegend({ dataset, settings });

  const ITEMS = useMemo(() => {
    return (
      CHROMA
        //
        .scale(COLORS)
        .colors(20)
        .map((color: ColorHex, i: number) => {
          const { max } = BOUNDARIES;
          const opacity = Math.min(Math.max(0.25, (i + 1) / 3), 1);

          return {
            color: CHROMA(color).alpha(opacity).css(),
            value: null,
            ...(i === 0 && { value: 0 }),
            ...(i === 9 && { value: max }),
          };
        })
    );
  }, []);

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 px-4 pt-0 pb-1">
        <LegendTypeGradient items={ITEMS} />
      </div>
    </LegendItem>
  );
};

export default DeprivationIndexLegend;
