import { Dataset } from 'types/datasets';

import { useClimateRisks } from 'hooks/climate-risks';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

export interface ClimateRiskLegendProps extends LegendItemProps {
  dataset: Dataset;
}

const ClimateRiskLegend = (props: ClimateRiskLegendProps) => {
  const { settings, dataset } = props;

  const { data: climateRisksData } = useClimateRisks();
  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        <LegendTypeBasic
          items={climateRisksData
            .filter((c) => c.value !== -1)
            .map((c) => ({
              color: c.color,
              value: 'Climate risk',
            }))}
        />
      </div>
    </LegendItem>
  );
};

export default ClimateRiskLegend;
