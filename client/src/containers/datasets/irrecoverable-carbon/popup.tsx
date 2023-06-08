import { useMemo } from 'react';

import cn from 'lib/classnames';

import CHROMA from 'chroma-js';

import { LayerSettings } from 'types/layers';

import { noPointData, usePointData } from 'hooks/data';
import { formatTperHA, useIsLoading } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

import { COLORS, BOUNDARIES } from './constants';

interface IrrecoverableCarbonPopupProps {
  settings: LayerSettings<'irrecoverable-carbon'>;
  event: mapboxgl.MapLayerMouseEvent;
}

const COLOR_SCALE = CHROMA.scale(COLORS).domain([0, BOUNDARIES.max]);

const IrrecoverableCarbonPopup = ({ event }: IrrecoverableCarbonPopupProps) => {
  const { lngLat } = event;

  const p = usePointData(
    {
      ...lngLat,
      cog: '/cog/irrecoverable_carbon',
    },
    {
      keepPreviousData: false,
    }
  );

  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const DATA = useMemo<number | null>(() => {
    if (!pointData) return null;
    if (noPointData(pointData)) return null;

    const d = pointData.b1;

    if (d === -9999) return null;

    return d;
  }, [pointData]);

  return (
    <div>
      <header className="flex space-x-2">
        <div
          className={cn({
            'relative top-1 h-4 w-4 shrink-0 border border-navy-500': true,
          })}
          style={{
            backgroundColor: COLOR_SCALE(DATA),
          }}
        />
        <h2 className="text-base font-semibold">Irrecoverable carrbon</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && <h3 className="text-sm font-light">{formatTperHA(DATA)}</h3>}
          </>
        )}
      </div>
    </div>
  );
};

export default IrrecoverableCarbonPopup;
