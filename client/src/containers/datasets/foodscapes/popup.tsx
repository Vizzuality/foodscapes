import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LayerSettings } from 'types/layers';

import { noPointData, usePointData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';
import { useIsLoading } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { Skeleton } from 'components/ui/skeleton';

interface FoodscapesPopupProps {
  settings: LayerSettings<'foodscapes'>;
  event: mapboxgl.MapLayerMouseEvent;
}

const FoodscapesPopup = ({ event, settings }: FoodscapesPopupProps) => {
  const { lngLat } = event;
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes');
  const band = `b${DATASET.layer.band}`;

  const f = useFoodscapes();
  const p = usePointData(lngLat, {
    keepPreviousData: false,
  });

  const { data: foodscapesData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!foodscapesData || !pointData) return null;
    if (noPointData(pointData)) return null;

    const value = pointData[band];

    return foodscapesData.find((d) => d.value === value);
  }, [band, foodscapesData, pointData]);

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div
          className="h-4 w-4 border"
          style={{
            background: settings.group ? DATA?.parentColor : DATA?.color,
            borderColor: settings.group
              ? DATA?.parentColor ?? 'var(--color-navy-500)'
              : DATA?.color ?? 'var(--color-navy-500)',
          }}
        />
        <h2 className="text-base font-semibold">
          {settings.group ? DATASET.labelGroup : DATASET?.label}
        </h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && (
          <div className="space-y-1.5">
            {!settings.group && <Skeleton className="h-4 w-[175px]" />}
            {!settings.group && <Skeleton className="h-4 w-[175px]" />}
            <Skeleton className="h-4 w-[100px]" />
          </div>
        )}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && (
              <h3 className="text-sm font-light">
                {settings.group ? DATA.parentLabel : DATA.label}
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodscapesPopup;
