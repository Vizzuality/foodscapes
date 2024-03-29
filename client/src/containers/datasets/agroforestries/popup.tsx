import { useMemo } from 'react';

import cn from 'lib/classnames';

import { Agroforestry } from 'types/agroforestries';
import { LayerSettings } from 'types/layers';

import { useAgroforestries } from 'hooks/agroforestries';
import { noPointData, usePointData } from 'hooks/data';
import { formatHA, formatPercentage, useIsLoading } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

interface AgroforestriesPopupProps {
  settings: LayerSettings<'agroforestries'>;
  event: mapboxgl.MapLayerMouseEvent;
}

const AgroforestriesPopup = ({ event, settings }: AgroforestriesPopupProps) => {
  const { lngLat } = event;
  const f = useAgroforestries();

  const p = usePointData(lngLat, {
    keepPreviousData: false,
  });

  const { data: agroforestriesData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const RESTORATION = useMemo<Agroforestry>(() => {
    if (!agroforestriesData) return null;
    const r = agroforestriesData.find((c) => c.column === settings.column);
    return r;
  }, [agroforestriesData, settings.column]);

  const DATA = useMemo<number | null>(() => {
    if (!pointData) return null;
    if (noPointData(pointData)) return null;

    const r = agroforestriesData.find((c) => c.column === settings.column);
    const d = pointData[`b${r.value}`];

    if (d === -1) return null;

    return d;
  }, [pointData, agroforestriesData, settings.column]);

  return (
    <div>
      <header className="flex space-x-2">
        <div
          className={cn({
            'relative top-1 h-4 w-4 shrink-0 border border-navy-500': true,
            'bg-[#94c072]': !!DATA,
          })}
        />
        <h2 className="text-base font-semibold">Agroforestry: {RESTORATION?.label}</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && DATA > 1 && (
              <h3 className="text-sm font-light">
                {`
                ${formatHA(DATA, {
                  notation: 'standard',
                  maximumFractionDigits: 0,
                })}
                |
                ${formatPercentage(DATA / 3086.9136, {
                  notation: 'standard',
                  maximumFractionDigits: 2,
                })}
                `}
              </h3>
            )}
            {!!DATA && DATA < 1 && <h3 className="text-sm font-light">{'< 1 ha'}</h3>}
          </>
        )}
      </div>
    </div>
  );
};

export default AgroforestriesPopup;
