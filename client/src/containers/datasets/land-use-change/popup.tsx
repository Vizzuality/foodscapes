import { LngLat } from 'types/map';

import { usePointData } from 'hooks/data';
import { useIsLoading } from 'hooks/utils';

interface LandUseChangePopupProps {
  latLng: LngLat;
}

const LandUseChangePopup = ({ latLng }: LandUseChangePopupProps) => {
  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  // const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const DATA = {
    color: '#000',
    label: 'Just testing soil groups',
  };

  // const DATA = useMemo(() => {
  //   if (!soilgroupsData || !pointData) return null;
  // if (noPointData(pointData)) return null;

  //   const band = 'b1';
  //   const value = pointData[band];

  //   return soilgroupsData.find((d) => d.value === value);
  // }, [soilgroupsData, pointData]);

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

            <h2 className="text-base font-semibold">Soil Group</h2>
          </header>

          <div className="mt-2 pl-6">
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && <h3 className="text-sm font-light">{DATA.label}</h3>}
          </div>
        </>
      )}
    </div>
  );
};

export default LandUseChangePopup;
