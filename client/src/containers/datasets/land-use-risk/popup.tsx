import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { noPointData, usePointData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';
import { useIsLoading } from 'hooks/utils';

import { Skeleton } from 'components/ui/skeleton';

interface LandUseRiskPopupProps {
  latLng: LngLat;
}

const LandUseRiskPopup = ({ latLng }: LandUseRiskPopupProps) => {
  const f = useLandUseRisks();

  const p = usePointData(latLng, {
    keepPreviousData: false,
  });

  const { data: landUseRisksData } = f;
  const { data: pointData } = p;

  const { isFetching, isFetched } = useIsLoading([p]);

  const DATA = useMemo(() => {
    if (!pointData) return null;
    if (noPointData(pointData)) return null;

    const d = landUseRisksData.filter((c) => pointData[`b${c.value}`] > 0);

    if (!d.length) return null;

    return d;
  }, [pointData, landUseRisksData]);

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div className={cn({ 'h-4 w-4 border border-navy-500': true, 'bg-red-500': !!DATA })} />
        <h2 className="text-base font-semibold">Land Use risk</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && (
              <ul className="list-outside list-disc pl-4">
                {DATA.map((d) => (
                  <li key={d.id} className="text-sm font-light">
                    {d.label}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LandUseRiskPopup;
