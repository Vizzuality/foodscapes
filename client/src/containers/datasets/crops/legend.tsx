import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

import { useLegend } from './hooks';

interface CropsLegendProps extends LegendItemProps {}

const CropsLegend = (props: CropsLegendProps) => {
  const { settings } = props;

  const legend = useLegend({ settings });

  return (
    <LegendItem {...legend} {...props}>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
    </LegendItem>
  );
};

export default CropsLegend;
