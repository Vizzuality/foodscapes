import { Dataset } from 'types/datasets';

import { usePollutionRisks } from 'hooks/pollution-risks';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

export interface PollutionRiskLegendProps extends LegendItemProps<'pollution-risks'> {
  dataset: Dataset;
}

const PollutionRiskLegend = (props: PollutionRiskLegendProps) => {
  const { settings, dataset } = props;

  const { data: pollutionRisksData } = usePollutionRisks();
  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        <LegendTypeBasic
          items={pollutionRisksData
            .filter((c) => c.value !== -1)
            .map((c) => ({
              color: c.color,
              value: 'Pesticide risk',
            }))}
        />
      </div>
    </LegendItem>
  );
};

export default PollutionRiskLegend;
