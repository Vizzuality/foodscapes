import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LayerSettings } from 'types/layers';
import { SoilHealth } from 'types/soil-healths';

import { noPointData, usePointData } from 'hooks/data';
import { useSoilHealths } from 'hooks/soil-healths';
import { formatHA, formatPercentage, useIsLoading } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

interface SoilHealthsPopupProps {
  settings: LayerSettings<'soil-healths'>;
  event: mapboxgl.MapLayerMouseEvent;
}

const SoilHealthsPopup = ({ event, settings }: SoilHealthsPopupProps) => {
  const { lngLat } = event;
  const f = useSoilHealths();

  const p = usePointData(lngLat, {
    keepPreviousData: false,
  });

  const { data: soilHealthsData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const RESTORATION = useMemo<SoilHealth>(() => {
    if (!soilHealthsData) return null;
    const r = soilHealthsData.find((c) => c.column === settings.column);
    return r;
  }, [soilHealthsData, settings.column]);

  const DATA = useMemo<number | null>(() => {
    if (!pointData) return null;
    if (noPointData(pointData)) return null;

    const r = soilHealthsData.find((c) => c.column === settings.column);
    const d = pointData[`b${r.value}`];

    if (d === -1) return null;

    return d;
  }, [pointData, soilHealthsData, settings.column]);

  return (
    <div>
      <header className="flex space-x-2">
        <div
          className={cn({
            'relative top-1 h-4 w-4 shrink-0 border border-navy-500': true,
            'bg-[#94c072]': !!DATA,
          })}
        />
        <h2 className="text-base font-semibold">SoilHealth: {RESTORATION?.label}</h2>
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

export default SoilHealthsPopup;
