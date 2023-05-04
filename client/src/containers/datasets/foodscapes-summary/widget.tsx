import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';
import squel from 'squel';

import { useData } from 'hooks/data';
import { convertPixelCountToHA } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

type SummaryProps = {
  total_foodscapes: number;
  total_countries: number;
  total_pixels: number;
};

const FoodscapesSummaryWidget = () => {
  const filters = useRecoilValue(filtersSelector(null));

  const { format } = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    maximumSignificantDigits: 3,
  });

  const {
    data = [],
    isError,
    isPlaceholderData,
  } = useData<SummaryProps>(
    {
      sql: squel
        .select()
        .field('COUNT(DISTINCT foodscapes)', 'total_foodscapes')
        .field('COUNT(DISTINCT country)', 'total_countries')
        .field('SUM(pixel_count)', 'total_pixels')
        .from('data')
        .where('foodscapes NOT IN ?', [1, 2, 3]),
      shape: 'array',
      ...filters,
    },
    {
      keepPreviousData: true,
    }
  );

  const SUMMARY = useMemo(() => {
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

  return (
    <section className="pt-5 text-navy-500">
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
              <dd className="font-display text-3xl">{`~${format(
                convertPixelCountToHA(SUMMARY.total_pixels, 1000000)
              )}`}</dd>
              <dt className="text-xs">Million Hectares</dt>
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
    </section>
  );
};

export default FoodscapesSummaryWidget;
