import { Dataset } from 'types/datasets';

import { WDPA_CATEGORIES } from 'containers/datasets/protected-areas/constants';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

export interface PotectedAreasLegendProps extends LegendItemProps<'protected-areas'> {
  dataset: Dataset;
}

const PotectedAreasLegend = (props: PotectedAreasLegendProps) => {
  const { settings, dataset } = props;

  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 py-2 px-4 pt-0">
        <div className="space-y-1">
          {/* <h4 className="text-sm">Categories:</h4> */}
          <LegendTypeBasic
            items={WDPA_CATEGORIES.map((w) => ({
              value: w.id,
              color: w.color,
            }))}
          />
        </div>
      </div>
    </LegendItem>
  );
};

export default PotectedAreasLegend;
