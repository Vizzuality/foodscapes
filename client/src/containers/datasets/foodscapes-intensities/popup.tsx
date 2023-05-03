import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { noPointData, usePointData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';
import { useIsLoading } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { Skeleton } from 'components/ui/skeleton';

interface FoodscapesIntensitiesPopupProps {
  latLng: LngLat;
}

const FoodscapesIntensitiesPopup = ({ latLng }: FoodscapesIntensitiesPopupProps) => {
  const DATASET = DATASETS.find((d) => d.id === 'foodscapes-intensities');
  const band = `b${DATASET.layer.band}`;

  const f = useFoodscapesIntensities();
  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  const { data: foodscapesIntensitiesData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!foodscapesIntensitiesData || !pointData) return null;
    if (noPointData(pointData)) return null;

    const value = pointData[band];

    return foodscapesIntensitiesData.find((d) => d.value === value);
  }, [band, foodscapesIntensitiesData, pointData]);

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div
          className="h-4 w-4 border"
          style={{
            background: DATA?.color,
            borderColor: DATA?.color ?? 'var(--color-navy-500)',
          }}
        />
        <h2 className="text-base font-semibold">Intensity</h2>
      </header>
      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && <h3 className="text-sm font-light">{DATA.label}</h3>}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodscapesIntensitiesPopup;
