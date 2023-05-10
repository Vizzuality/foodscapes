import { Dataset } from 'types/datasets';

import { useLandUseRisks } from 'hooks/land-use-risks';
import { COLORS } from 'hooks/land-use-risks';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';
import LegendTypeChoropleth from 'components/map/legend/types/choropleth/component';

import { useLegend } from './hooks';

export interface LandUseRiskLegendProps extends LegendItemProps {
  dataset: Dataset;
}

const LandUseRiskLegend = (props: LandUseRiskLegendProps) => {
  const { settings, dataset, filters } = props;
  const { landUseRisk } = filters;
  const { data: landUseRisksData } = useLandUseRisks();

  // DATA
  const legend = useLegend({ dataset, settings });

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20 px-4 pt-0 pb-1">
        {!!landUseRisk.length && (
          <LegendTypeBasic
            items={landUseRisksData
              .filter((c) => landUseRisk.includes(c.value))
              .map((c) => ({
                color: c.color,
                value: c.label,
              }))}
          />
        )}

        {!landUseRisk.length && (
          <LegendTypeChoropleth
            items={landUseRisksData.map((c, i) => ({
              color: COLORS[i],
              value: null,
            }))}
          />
        )}
      </div>
    </LegendItem>
  );
};

export default LandUseRiskLegend;
