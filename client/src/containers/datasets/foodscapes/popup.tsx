import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { noPointData, usePointData } from 'hooks/data';
import { useFoodscapes } from 'hooks/foodscapes';
import { useIsLoading } from 'hooks/utils';

interface FoodscapesPopupProps {
  latLng: LngLat;
}

const FoodscapesPopup = ({ latLng }: FoodscapesPopupProps) => {
  const f = useFoodscapes();
  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  const { data: foodscapesData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!foodscapesData || !pointData) return null;
    if (noPointData(pointData)) return null;

    const band = 'b1';
    const value = pointData[band];

    return foodscapesData.find((d) => d.value === value);
  }, [foodscapesData, pointData]);

  return (
    <div>
      {isFetching && !isFetched && <h2>Loading...</h2>}
      {isFetched && (
        <>
          <header className="flex items-center space-x-2">
            {!!DATA && <div className="h-4 w-4" style={{ background: DATA?.color }} />}
            <h2 className="text-base font-light">Foodscape</h2>
          </header>

          <div className={cn({ 'mt-2 pl-6': true, 'pl-0': !DATA })}>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && <h3 className="text-sm font-light">{DATA.label}</h3>}
          </div>
        </>
      )}
    </div>
  );
};

export default FoodscapesPopup;
