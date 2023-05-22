import { Dataset } from 'types/datasets';

import { useRestorations } from 'hooks/restorations';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';
// import LegendTypeChoropleth from 'components/map/legend/types/choropleth/component';

import { useLegend } from './hooks';

export interface RestorationsLegendProps extends LegendItemProps<'restorations'> {
  dataset: Dataset;
}

const RestorationsLegend = (props: RestorationsLegendProps) => {
  const { settings, dataset } = props;
  const { data: restorationsData } = useRestorations();

  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        <LegendTypeBasic
          items={restorationsData.map((c) => ({
            color: c.color,
            value: c.label,
          }))}
        />
      </div>
    </LegendItem>
  );
};

export default RestorationsLegend;
