import { useMemo } from 'react';

import { filtersSelector, landUseRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { LandUseRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const LandUseFilters = () => {
  const landUseFilters = useRecoilValue(filtersSelector('landUseRisk'));

  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);

  const {
    data: landUseData,
    isPlaceholderData: landUseIsPlaceholderData,
    isFetching: landUseIsFetching,
    isFetched: landUseIsFetched,
    isError: landUseIsError,
  } = useLandUseRisks();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<LandUseRiskData>(
    'land-use-risks',
    landUseFilters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !landUseData) return [];

    return landUseData.map((c) => ({
      ...c,
      disabled: !data.find((d) => d.id === c.column)?.value,
    }));
  }, [data, landUseData]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Land use change</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={landUseIsPlaceholderData || isPlaceholderData}
        isFetching={landUseIsFetching || isFetching}
        isFetched={landUseIsFetched && isFetched}
        isError={landUseIsError || isError}
      >
        <SingleSelect
          id="riks-land-use-change-select"
          size="s"
          theme="dark"
          placeholder="All land use changes"
          options={OPTIONS}
          loading={isFetching || landUseIsFetching}
          value={landUseRisk[0] ?? null}
          onChange={(value) => {
            if (value === null) {
              setLandUseRisk([]);
            } else {
              setLandUseRisk([value as number]);
            }
          }}
          clearable
        />
      </FiltersContent>
    </div>
  );
};

export default LandUseFilters;
