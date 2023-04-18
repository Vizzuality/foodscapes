import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { useCrops } from 'hooks/crops';
import { noPointData, usePointData } from 'hooks/data';
import { useIsLoading } from 'hooks/utils';

interface CropsPopupProps {
  latLng: LngLat;
}

const CropsPopup = ({ latLng }: CropsPopupProps) => {
  const f = useCrops();
  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  const { data: cropsData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!cropsData || !pointData) return null;
    if (noPointData(pointData)) return null;

    const band = 'b4';
    const value = pointData[band];

    return cropsData.find((d) => d.value === value);
  }, [cropsData, pointData]);

  return (
    <div>
      {isFetching && !isFetched && <h2>Loading...</h2>}
      {isFetched && (
        <>
          <header className="flex items-center space-x-2">
            <div
              className="h-4 w-4 border"
              style={{
                background: DATA?.color,
                borderColor: DATA?.color ?? 'var(--color-navy-500)',
              }}
            />
            <h2 className="text-base font-semibold">Crop</h2>
          </header>

          <div className={cn({ 'mt-2 pl-6': true })}>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && <h3 className="text-sm font-light">{DATA.label}</h3>}
          </div>
        </>
      )}
    </div>
  );
};

export default CropsPopup;
