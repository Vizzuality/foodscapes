import { useMemo } from 'react';

import cn from 'lib/classnames';

import { noPointData, usePointData } from 'hooks/data';
import { useProvince } from 'hooks/provinces';
import { useIsLoading } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import Icon from 'components/icon';
import { Skeleton } from 'components/ui/skeleton';

import PIN_SVG from 'svgs/map/pin.svg?sprite';

interface ProvincesPopupProps {
  event: mapboxgl.MapLayerMouseEvent;
}

const ProvincesPopup = ({ event }: ProvincesPopupProps) => {
  const { lngLat } = event;
  const DATASET = DATASETS.find((d) => d.id === 'provinces');
  const band = `b${DATASET.layer.band}`;

  const p = usePointData(lngLat, {
    keepPreviousData: false,
  });

  const { data: pointData } = p;

  const f = useProvince(pointData[band], {
    enabled: !!pointData[band],
  });
  const { data: provinceData } = f;

  const { isFetching, isFetched } = useIsLoading([f, p]);

  const DATA = useMemo(() => {
    if (!provinceData || !pointData) return null;

    if (noPointData(pointData)) return null;

    return provinceData;
  }, [provinceData, pointData]);

  return (
    <div>
      <header className="flex items-center space-x-2">
        <Icon icon={PIN_SVG} className="h-4 w-4 text-navy-500" />
        <h2 className="text-base font-semibold">Location</h2>
      </header>
      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}

        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && (
              <h3 className="text-sm font-light">
                {DATA.label}, {DATA.parentLabel}
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProvincesPopup;
