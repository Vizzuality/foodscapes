import dynamic from 'next/dynamic';

import cn from 'lib/classnames';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

const Chart = dynamic(() => import('./chart'), { ssr: false });

export interface FoodscapesIntensitiesLegendProps
  extends LegendItemProps<'foodscapes-intensities'> {
  dataset: Dataset;
}

const FoodscapesIntensitiesLegend = (props: FoodscapesIntensitiesLegendProps) => {
  const { settings, dataset } = props;

  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const legend = useLegend({ dataset, settings });
  const {
    data: foodscapesIntensitiesData,
    isPlaceholderData: foodscapesIntensitiesIsPlaceholderData,
    isFetching: foodscapesIntensitiesIsFetching,
    isFetched: foodscapesIntensitiesIsFetched,
    isError: foodscapesIntensitiesIsError,
  } = useFoodscapesIntensities();
  const { data, isPlaceholderData, isFetching, isFetched, isError } =
    useData<FoodscapeIntensityData>({
      sql: dataset.widget.sql,
      shape: 'array',
      ...filters,
    });

  return (
    <LegendItem {...legend} {...props}>
      <LegendContent
        isPlaceholderData={isPlaceholderData || foodscapesIntensitiesIsPlaceholderData}
        isFetching={isFetching || foodscapesIntensitiesIsFetching}
        isFetched={isFetched && foodscapesIntensitiesIsFetched}
        isError={isError || foodscapesIntensitiesIsError}
      >
        <div className="divide-y divide-navy-500/20">
          <div className="ml-0.5 px-4 pt-3 pb-5">
            <div className="h-3.5">
              <Chart dataset={dataset} ignore={null} />
            </div>
          </div>

          <ul className="divide-y divide-navy-500/20 py-4">
            <li
              className={cn({
                'ml-0.5 space-y-2 py-4 px-4 first:pt-0 last:pb-0': true,
              })}
            >
              <LegendTypeBasic
                items={foodscapesIntensitiesData
                  //
                  .filter((f) => {
                    return data.find((d) => f.value === d.id);
                  })
                  .map((v) => {
                    return {
                      value: v.label,
                      color: v.color,
                    };
                  })}
              />
            </li>
          </ul>
        </div>
      </LegendContent>
    </LegendItem>
  );
};

export default FoodscapesIntensitiesLegend;
