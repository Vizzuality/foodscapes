import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import cn from 'lib/classnames';

import { filtersSelector } from 'store/explore-map';

import { group } from 'd3-array';
import { useRecoilValue } from 'recoil';

// import { FoodscapeData } from 'types/data';
import { Dataset } from 'types/datasets';

import { useData } from 'hooks/data';
import { useIrrecoverableCarbon } from 'hooks/irrecoverable-carbon';

import { LegendContent } from 'containers/legend';

import LegendItem from 'components/map/legend/item';
import { LegendItemProps } from 'components/map/legend/types';
import LegendTypeBasic from 'components/map/legend/types/basic/component';

import { useLegend } from './hooks';

export interface IrrecoverableCarbonLegendProps extends LegendItemProps<'irrecoverable-carbon'> {
  dataset: Dataset;
}

const IrrecoverableCarbonLegend = (props: IrrecoverableCarbonLegendProps) => {
  const { settings, dataset } = props;

  const filters = useRecoilValue(filtersSelector(null));

  // DATA
  const legend = useLegend({ dataset, settings });
  const {
    data: carbonData,
    isPlaceholderData: carbonIsPlaceholderData,
    isFetching: carbonIsFetching,
    isFetched: carbonIsFetched,
    isError: carbonIsError,
  } = useIrrecoverableCarbon();

  //type UseData
  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData(
    'irrecoverable-carbon',
    filters
  );

  const GROUPED_DATA = useMemo(() => {
    if (!data || !carbonData) return [];
    return (
      Array
        // group by parent
        .from(
          group(
            carbonData.filter((f) => {
              return data.find((d) => f.value === d.id);
            }),
            (d) => d.parentLabel
          ),
          ([key, value]) => ({ key, color: value.reduce((acc, v) => v.parentColor, ''), value })
        )
        // sort by key
        .sort((a, b) => a.key.localeCompare(b.key))
    );
  }, [carbonData, data]);

  return (
    <LegendItem {...legend} {...props}>
      <LegendContent
        isPlaceholderData={isPlaceholderData || carbonIsPlaceholderData}
        isFetching={isFetching || carbonIsFetching}
        isFetched={isFetched && carbonIsFetched}
        isError={isError || carbonIsError}
      >
        <div className="divide-y divide-navy-500/20">
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

export default IrrecoverableCarbonLegend;
