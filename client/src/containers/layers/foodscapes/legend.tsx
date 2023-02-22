import { useMemo } from 'react';

import cn from 'lib/classnames';

import { group } from 'd3-array';

import { useFoodscapes } from 'hooks/foodscapes';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

interface FoodscapesLegendProps extends LegendItemProps {}

const FoodscapesLegend = (props: FoodscapesLegendProps) => {
  const { settings } = props;

  const legend = useLegend({ settings });

  const { data: foodscapesData } = useFoodscapes();

  const GROUPED_DATA = useMemo(() => {
    return (
      Array
        // group by parent
        .from(
          group(foodscapesData, (d) => d.parent),
          ([key, value]) => ({ key, value })
        )
        // sort by key
        .sort((a, b) => a.key.localeCompare(b.key))
    );
  }, [foodscapesData]);

  return (
    <LegendItem {...legend} {...props}>
      <ul className="divide-y divide-navy-500/20 py-2">
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
    </LegendItem>
  );
};

export default FoodscapesLegend;
