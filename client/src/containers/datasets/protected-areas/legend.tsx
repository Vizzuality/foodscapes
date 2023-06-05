import { Dataset } from 'types/datasets';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

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
      <div className="divide-y divide-navy-500/20">
        <ul className="divide-y divide-navy-500/20 pt-3 pb-4">Protected areas</ul>
      </div>
    </LegendItem>
  );
};

export default PotectedAreasLegend;
