import { useMemo } from 'react';

import cn from 'lib/classnames';

import { LngLat } from 'types/map';

import { noPointData, usePointData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';
import { useIsLoading } from 'hooks/utils';

import { DATASETS } from 'constants/datasets';

import { Skeleton } from 'components/ui/skeleton';

interface LandUseRiskPopupProps {
  latLng: LngLat;
}

const LandUseRiskPopup = ({ latLng }: LandUseRiskPopupProps) => {
  const DATASET = DATASETS.find((d) => d.id === 'land-use-risk');
  const band = `b${DATASET.layer.band}`;

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

    const value = pointData[band];

    return value;
  }, [band, pointData]);

  return (
    <div>
      <header className="flex items-center space-x-2">
        <div
          className="h-4 w-4 border"
          style={{
            background: landUseRisksData.find((c) => c.value === DATA)?.color,
            borderColor: 'var(--color-navy-500)',
          }}
        />
        <h2 className="text-base font-semibold">Land Use risk</h2>
      </header>

      <div className={cn({ 'mt-2 pl-6': true })}>
        {isFetching && !isFetched && <Skeleton className="h-4 w-[175px]" />}
        {isFetched && (
          <>
            {!DATA && <h3 className="text-sm font-light">No data</h3>}
            {!!DATA && (
              <h3 className="text-sm font-light">
                {DATA === -1 && 'Not risked'}
                {DATA === 1 && 'Risked'}
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LandUseRiskPopup;