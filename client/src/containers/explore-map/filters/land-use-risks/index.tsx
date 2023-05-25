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

  const {
    isPlaceholderData: landIsPlaceholderData,
    isFetching: landIsFetching,
    isFetched: landIsFetched,
    isError: landIsError,
  } = useData<LandUseRiskData>('land-use-risks', landUseFilters);

  return (
    <FiltersContent
      isPlaceholderData={landUseIsPlaceholderData || landIsPlaceholderData}
      isFetching={landUseIsFetching || landIsFetching}
      isFetched={landUseIsFetched && landIsFetched}
      isError={landUseIsError || landIsError}
    >
      <div className="space-y-1">
        <p className="font-sans text-xs font-bold">Land use change</p>

        <SingleSelect
          id="riks-land-use-change-select"
          size="s"
          theme="dark"
          placeholder="Filter risk"
          options={landUseData}
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
      </div>
    </FiltersContent>
  );
};

export default LandUseFilters;
