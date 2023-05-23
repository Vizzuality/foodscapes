import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { useData } from 'hooks/data';
import { convertPixelCountToHA } from 'hooks/utils';

import WidgetError from 'containers/widget/error';

import { Skeleton } from 'components/ui/skeleton';

type SummaryProps = {
  total_foodscapes: number;
  total_countries: number;
  total_pixels: number;
};

const FoodscapesSummaryWidget = () => {
  const filters = useRecoilValue(filtersSelector(null));

  const { data, isError, isPlaceholderData, isFetching, isFetched } = useData<SummaryProps>(
    'foodscapes-summary',
    filters,
    {
      keepPreviousData: true,
    }
  );

  const SUMMARY = useMemo(() => {
    if (!data)
      return {
        total_foodscapes: 0,
        total_countries: 0,
        total_pixels: 0,
      };

    return data.reduce(
      (acc, curr) => {
        return {
          total_foodscapes: curr.total_foodscapes + acc.total_foodscapes,
          total_countries: curr.total_countries + acc.total_countries,
          total_pixels: curr.total_pixels + acc.total_pixels,
        };
      },
      {
        total_foodscapes: 0,
        total_countries: 0,
        total_pixels: 0,
      }
    );
  }, [data]);

  const TOTAL_PIXELS = useMemo(() => {
    if (SUMMARY.total_pixels === 0)
      return {
        value: 0,
        unit: '',
      };

    if (SUMMARY.total_pixels * 3086.9136 < 1000000)
      return {
        value: SUMMARY.total_pixels / 1000,
        unit: 'Thousands',
      };

    return {
      value: SUMMARY.total_pixels / 1000000,
      unit: 'Millions',
    };
  }, [SUMMARY]);

  return (
    <section className="pt-5 text-navy-500">
      {isError && isFetched && !isFetching && <WidgetError className="p-4" />}
      {!isError && (
        <dl className="flex justify-between divide-x divide-navy-500/30">
          <div className="w-full text-center">
            {isPlaceholderData && (
              <div className="px-4">
                <Skeleton className="h-14 w-full p-1" />
              </div>
            )}
            {!isPlaceholderData && !isError && (
              <>
                <dd className="font-display text-3xl">{SUMMARY.total_foodscapes}</dd>
                <dt className="text-xs">Foodscapes classes</dt>
              </>
            )}
          </div>
          <div className="w-full text-center">
            {isPlaceholderData && (
              <div className="px-4">
                <Skeleton className="h-14 w-full p-1" />
              </div>
            )}
            {!isPlaceholderData && !isError && (
              <>
                <dd className="font-display text-3xl">{`~${convertPixelCountToHA(
                  TOTAL_PIXELS.value,
                  {
                    style: 'decimal',
                    notation: 'standard',
                    maximumSignificantDigits: 3,
                    maximumFractionDigits: 0,
                  }
                )}`}</dd>
                <dt className="text-xs">{TOTAL_PIXELS.unit} Hectares</dt>
              </>
            )}
          </div>
          <div className="w-full text-center">
            {isPlaceholderData && (
              <div className="px-4">
                <Skeleton className="h-14 w-full p-1" />
              </div>
            )}
            {!isPlaceholderData && !isError && (
              <>
                <dd className="font-display text-3xl">{SUMMARY.total_countries}</dd>
                <dt className="text-xs">Countries</dt>
              </>
            )}
          </div>
        </dl>
      )}
    </section>
  );
};

export default FoodscapesSummaryWidget;
