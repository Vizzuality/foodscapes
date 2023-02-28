import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { noPointData, usePointData } from 'hooks/data';
import { useProvinces } from 'hooks/provinces';
import { useIsLoading } from 'hooks/utils';

import Icon from 'components/icon';

import PIN_SVG from 'svgs/map/pin.svg?sprite';

interface ProvincesPopupProps {
  latLng: LngLat;
}

const ProvincesPopup = ({ latLng }: ProvincesPopupProps) => {
  const f = useProvinces();
  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  const { data: provincesData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!provincesData || !pointData) return null;

    if (noPointData(pointData)) return null;

    const band = 'b4';
    const value = pointData[band];

    return provincesData.find((d) => d.value === value);
  }, [provincesData, pointData]);

  return (
    <div>
      {isFetching && !isFetched && <h2>Loading...</h2>}
      {isFetched && (
        <>
          <header className="flex items-center space-x-2">
            {!!DATA && <Icon icon={PIN_SVG} className="h-4 w-4 text-navy-500" />}
            <h2 className="mt-0.5 text-base font-semibold">Location</h2>
          </header>

          <div className={cn({ 'mt-2 pl-6': true, 'pl-0': !DATA })}>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && (
              <h3 className="text-sm font-light">
                {DATA.label}, {DATA.parent}
              </h3>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProvincesPopup;
