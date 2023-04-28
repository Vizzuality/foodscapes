import { useMemo } from 'react';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';
import squel from 'squel';

import { useData } from 'hooks/data';

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

  const { data } = useData<SummaryProps>(
    {
      sql: squel
        .select()
        .field('COUNT(DISTINCT foodscapes)', 'total_foodscapes')
        .field('COUNT(DISTINCT country)', 'total_countries')
        .field('COUNT(pixel_count)', 'total_pixels')
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
    if (!data.length) return null;

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

  if (!SUMMARY) return null;

  return (
    <section className="pt-5 text-navy-500">
      <dl className="flex justify-between divide-x divide-navy-500/30">
        <div className="w-full text-center">
          <dd className="font-display text-3xl">{SUMMARY.total_foodscapes || '-'}</dd>
          <dt className="text-xs">Foodscapes classes</dt>
        </div>
        <div className="w-full text-center">
          <dd className="font-display text-3xl">{`~${format(
            (SUMMARY.total_pixels * 3086.9136) / 1000000
          )}`}</dd>
          <dt className="text-xs">Million Hectares</dt>
        </div>
        <div className="w-full text-center">
          <dd className="font-display text-3xl">{SUMMARY.total_countries || '-'}</dd>
          <dt className="text-xs">Countries</dt>
        </div>
      </dl>
    </section>
  );
};

export default FoodscapesSummaryWidget;
