import { climateRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ClimateRiskData } from 'types/data';

import { useClimateRisks } from 'hooks/climate-risks';
import { useData } from 'hooks/data';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const ClimateRisksFilters = () => {
  const climateFilters = useRecoilValue(filtersSelector('climateRisk'));

  const climateChange = useRecoilValue(climateRiskAtom);
  const setClimateChange = useSetRecoilState(climateRiskAtom);

  const {
    data: climateData,
    isPlaceholderData: climateIsPlaceholderData,
    isFetching: climateIsFetching,
    isFetched: climateIsFetched,
    isError: climateIsError,
  } = useClimateRisks();

  const {
    isPlaceholderData: riskIsPlaceholderData,
    isFetching: riskIsFetching,
    isFetched: riskIsFetched,
    isError: riskIsError,
  } = useData<ClimateRiskData>('climate-risks', climateFilters);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Climate change</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={riskIsPlaceholderData || climateIsPlaceholderData}
        isFetching={riskIsFetching || climateIsFetching}
        isFetched={riskIsFetched && climateIsFetched}
        isError={riskIsError || climateIsError}
      >
        <SingleSelect
          id="riks-climate-change-select"
          size="s"
          theme="dark"
          placeholder="Select..."
          options={climateData}
          value={climateChange[0] ?? null}
          onChange={(value) => {
            if (value === null) {
              setClimateChange([]);
            } else {
              setClimateChange([value as number]);
            }
          }}
          clearable
        />
      </FiltersContent>
    </div>
  );
};

export default ClimateRisksFilters;
