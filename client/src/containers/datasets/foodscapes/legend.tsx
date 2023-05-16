import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import cn from 'lib/classnames';

import { filtersSelector } from 'store/explore-map';

import { group } from 'd3-array';
import { useRecoilValue } from 'recoil';

import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const ChartGroup = dynamic(() => import('./chart/group'), { ssr: false });

export interface FoodscapesLegendProps extends LegendItemProps<'foodscapes'> {
  dataset: Dataset;
}

const FoodscapesLegend = (props: FoodscapesLegendProps) => {
  const { settings, dataset } = props;

  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const legend = useLegend({ dataset, settings });
  const {
    data: foodscapesData,
    isPlaceholderData: foodscapesIsPlaceholderData,
    isFetching: foodscapesIsFetching,
    isFetched: foodscapesIsFetched,
    isError: foodscapesIsError,
  } = useFoodscapes();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<FoodscapeData>({
    sql: dataset.widget.sql,
    shape: 'array',
    ...filters,
  });

  const GROUPED_DATA = useMemo(() => {
    if (!data || !foodscapesData) return [];
    return (
      Array
        // group by parent
        .from(
          group(
            foodscapesData.filter((f) => {
              return data.find((d) => f.value === d.id);
            }),
            (d) => d.parentLabel
          ),
          ([key, value]) => ({ key, color: value.reduce((acc, v) => v.parentColor, ''), value })
        )
        // sort by key
        .sort((a, b) => a.key.localeCompare(b.key))
    );
  }, [foodscapesData, data]);

  return (
    <LegendItem {...legend} {...props}>
      <LegendContent
        isPlaceholderData={isPlaceholderData || foodscapesIsPlaceholderData}
        isFetching={isFetching || foodscapesIsFetching}
        isFetched={isFetched && foodscapesIsFetched}
        isError={isError || foodscapesIsError}
      >
        <div className="divide-y divide-navy-500/20">
          <div className="ml-0.5 px-4 pt-3 pb-5">
            <div className="h-3.5">
              {!settings.group && (
                <Chart
                  //
                  dataset={dataset}
                  ignore={null}
                />
              )}

              {settings.group && (
                <ChartGroup
                  //
                  dataset={dataset}
                  selected={filters.foodscapes}
                  ignore={null}
                />
              )}
            </div>
          </div>

          <ul className="divide-y divide-navy-500/20 pt-3 pb-4">
            {!settings.group &&
              GROUPED_DATA.map((g) => (
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

            {settings.group && (
              <li
                className={cn({
                  'ml-0.5 space-y-2 py-4 px-4 first:pt-0 last:pb-0': true,
                })}
              >
                <LegendTypeBasic
                  items={GROUPED_DATA.map((v) => {
                    return {
                      value: v.key,
                      color: v.color,
                    };
                  })}
                />
              </li>
            )}
          </ul>
        </div>
      </LegendContent>
    </LegendItem>
  );
};

export default FoodscapesLegend;
