import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LayerSettings } from 'types/layers';
import { Restoration } from 'types/restorations';

import { noPointData, usePointData } from 'hooks/data';
import { useRestorations } from 'hooks/restorations';
import { formatHA, formatPercentage, useIsLoading } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

interface RestorationsPopupProps {
  settings: LayerSettings<'restorations'>;
  event: mapboxgl.MapLayerMouseEvent;
}

const RestorationsPopup = ({ event, settings }: RestorationsPopupProps) => {
  const { lngLat } = event;
  const f = useRestorations();

  const p = usePointData(lngLat, {
    keepPreviousData: false,
  });

  const { data: restorationsData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const RESTORATION = useMemo<Restoration>(() => {
    if (!restorationsData) return null;
    const r = restorationsData.find((c) => c.column === settings.column);
    return r;
  }, [restorationsData, settings.column]);

  const DATA = useMemo<number | null>(() => {
    if (!pointData) return null;
    if (noPointData(pointData)) return null;

    const r = restorationsData.find((c) => c.column === settings.column);
    const d = pointData[`b${r.value}`];

    if (d === -1) return null;

    return d;
  }, [pointData, restorationsData, settings.column]);

  return (
    <div>
      <header className="flex space-x-2">
        <div
          className={cn({
            'relative top-1 h-4 w-4 shrink-0 border border-navy-500': true,
            'bg-green-500': !!DATA,
          })}
        />
        <h2 className="text-base font-semibold">Restoration: {RESTORATION?.label}</h2>
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

export default RestorationsPopup;
