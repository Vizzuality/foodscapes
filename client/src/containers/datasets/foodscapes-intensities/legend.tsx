import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import cn from 'lib/classnames';

import { group } from 'd3-array';

import { Dataset } from 'types/datasets';

import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

const Chart = dynamic(() => import('./chart'), { ssr: false });

export interface FoodscapesIntensitiesLegendProps extends LegendItemProps {
  dataset: Dataset;
}

const FoodscapesIntensitiesLegend = (props: FoodscapesIntensitiesLegendProps) => {
  const { settings, dataset } = props;

  const legend = useLegend({ dataset, settings });

  const { data: foodscapesIntensitiesData } = useFoodscapesIntensities();

  const GROUPED_DATA = useMemo(() => {
    return (
      Array
        // group by parent
        .from(
          group(foodscapesIntensitiesData, (d) => d.parentLabel),
          ([key, value]) => ({ key, value })
        )
        // sort by key
        .sort((a, b) => a.key.localeCompare(b.key))
    );
  }, [foodscapesIntensitiesData]);

  return (
    <LegendItem {...legend} {...props}>
      <div className="divide-y divide-navy-500/20">
        <div className="ml-0.5 px-4 pt-3 pb-5">
          <div className="h-3.5">
            <Chart dataset={dataset} />
          </div>
        </div>

        <ul className="divide-y divide-navy-500/20 py-4">
          {GROUPED_DATA.map((g) => (
            <li
              key={g.key}
              className={cn({
                'ml-0.5 space-y-2 py-4 px-4 first:pt-0 last:pb-0': true,
              })}
            >
              <h4 className="text-xs font-bold">{g.key}</h4>
              <LegendTypeBasic
                items={g.value.map((v) => {
                  return {
                    value: v.label,
                    color: v.color,
                  };
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </LegendItem>
  );
};

export default FoodscapesIntensitiesLegend;
