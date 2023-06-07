import { Dataset } from 'types/datasets';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

import { useLegend } from './hooks';

export interface RiverBasinsLegendProps extends LegendItemProps<'river-basins'> {
  dataset: Dataset;
}

const RiverBasinsLegend = (props: RiverBasinsLegendProps) => {
  const { settings, dataset } = props;

  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="space-y-2 py-2 px-4 pt-0">
        <div className="ml-0.5 space-y-1">
          {/* <h4 className="text-sm">Categories:</h4> */}
          <div className="flex space-x-2 text-xs">
            <div className="mt-1 h-2 w-2 flex-shrink-0 border-2 border-[#1f31b4]" />
            <div>River basins</div>
          </div>
        </div>
      </div>
    </LegendItem>
  );
};

export default RiverBasinsLegend;
