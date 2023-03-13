import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

import { useLegend } from './hooks';

interface CropGroupsLegendProps extends LegendItemProps {}

const CropGroupsLegend = (props: CropGroupsLegendProps) => {
  const { settings } = props;

  const legend = useLegend({ settings });

  return (
    <LegendItem {...legend} {...props}>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
    </LegendItem>
  );
};

export default CropGroupsLegend;
