import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

import { useLegend } from './hooks';

interface CropsLegendProps extends LegendItemProps {}

const CropsLegend = (props: CropsLegendProps) => {
  const { settings } = props;

  const legend = useLegend({ settings });

  return (
    <LegendItem {...legend} {...props}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis
        molestias consequatur aliquam commodi molestiae a! Modi ab officiis delectus vero obcaecati
        omnis praesentium consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis molestias consequatur aliquam
        commodi molestiae a! Modi ab officiis delectus vero obcaecati omnis praesentium consectetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis
        molestias consequatur aliquam commodi molestiae a! Modi ab officiis delectus vero obcaecati
        omnis praesentium consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis molestias consequatur aliquam
        commodi molestiae a! Modi ab officiis delectus vero obcaecati omnis praesentium consectetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis
        molestias consequatur aliquam commodi molestiae a! Modi ab officiis delectus vero obcaecati
        omnis praesentium consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis molestias consequatur aliquam
        commodi molestiae a! Modi ab officiis delectus vero obcaecati omnis praesentium consectetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis
        molestias consequatur aliquam commodi molestiae a! Modi ab officiis delectus vero obcaecati
        omnis praesentium consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis molestias consequatur aliquam
        commodi molestiae a! Modi ab officiis delectus vero obcaecati omnis praesentium consectetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis
        molestias consequatur aliquam commodi molestiae a! Modi ab officiis delectus vero obcaecati
        omnis praesentium consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia, unde, reiciendis impedit soluta aliquid perspiciatis molestias consequatur aliquam
        commodi molestiae a! Modi ab officiis delectus vero obcaecati omnis praesentium consectetur.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, unde, reiciendis impedit
        soluta aliquid perspiciatis molestias consequatur aliquam commodi molestiae a! Modi ab
        officiis delectus vero obcaecati omnis praesentium consectetur.
      </div>
    </LegendItem>
  );
};

export default CropsLegend;
