import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';

import { useLegend } from './hooks';

interface FoodscapesLegendProps extends LegendItemProps {}

const FoodscapesLegend = (props: FoodscapesLegendProps) => {
  const { settings } = props;

  const legend = useLegend({ settings });

  return (
    <LegendItem {...legend} {...props}>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi quo quae
        maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem repellendus tempore
        aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime similique
        quos quidem repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis
        saepe corrupti maxime similique quos quidem repellendus tempore aut quam itaque amet
        laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi
        quo quae maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem repellendus
        tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime
        similique quos quidem repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Nam rerum libero modi quo quae maiores dolorum,
        reiciendis saepe corrupti maxime similique quos quidem repellendus tempore aut quam itaque
        amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero
        modi quo quae maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem
        repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti
        maxime similique quos quidem repellendus tempore aut quam itaque amet laboriosam. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Nam rerum libero modi quo quae maiores
        dolorum, reiciendis saepe corrupti maxime similique quos quidem repellendus tempore aut quam
        itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam rerum
        libero modi quo quae maiores dolorum, reiciendis saepe corrupti maxime similique quos quidem
        repellendus tempore aut quam itaque amet laboriosam. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Nam rerum libero modi quo quae maiores dolorum, reiciendis saepe corrupti
        maxime similique quos quidem repellendus tempore aut quam itaque amet laboriosam.
      </div>
    </LegendItem>
  );
};

export default FoodscapesLegend;
