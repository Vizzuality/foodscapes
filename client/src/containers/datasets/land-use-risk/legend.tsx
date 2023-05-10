import { Dataset } from 'types/datasets';

import { useLandUseRisks } from 'hooks/land-use-risks';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

export interface LandUseRiskLegendProps extends LegendItemProps {
  dataset: Dataset;
}

const LandUseRiskLegend = (props: LandUseRiskLegendProps) => {
  const { settings, dataset } = props;

  const { data: landUseRisksData } = useLandUseRisks();
  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        <LegendTypeBasic
          items={landUseRisksData.map((c) => ({
            color: c.color,
            value: c.label,
          }))}
        />
      </div>
    </LegendItem>
  );
};

export default LandUseRiskLegend;
