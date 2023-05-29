import { filtersSelector, pollutionRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { PollutionRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { usePollutionRisks } from 'hooks/pollution-risks';

import FiltersContent from 'containers/explore-map/filters/content';

import SingleSelect from 'components/ui/select/single/component';

const PollutionRisksFilters = () => {
  const pollutionFilters = useRecoilValue(filtersSelector('pollutionRisk'));

  const pollution = useRecoilValue(pollutionRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const {
    data: pollutionData,
    isPlaceholderData: pollutionIsPlaceholderData,
    isFetching: pollutionIsFetching,
    isFetched: pollutionIsFetched,
    isError: pollutionIsError,
  } = usePollutionRisks();

  const {
    isPlaceholderData: pollutionRiskIsPlaceholderData,
    isFetching: pollutionRiskIsFetching,
    isFetched: pollutionRiskIsFetched,
    isError: pollutionRiskIsError,
  } = useData<PollutionRiskData>('pollution-risks', pollutionFilters);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Pollution</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={pollutionRiskIsPlaceholderData || pollutionIsPlaceholderData}
        isFetching={pollutionRiskIsFetching || pollutionIsFetching}
        isFetched={pollutionRiskIsFetched && pollutionIsFetched}
        isError={pollutionRiskIsError || pollutionIsError}
      >
        <SingleSelect
          id="pollution-risk"
          size="s"
          theme="dark"
          placeholder="Select..."
          options={pollutionData}
          value={pollution[0] ?? null}
          onChange={(value) => {
            if (value === null) {
              setPollution([]);
            } else {
              setPollution([value as number]);
            }
          }}
          clearable
        />
      </FiltersContent>
    </div>
  );
};

export default PollutionRisksFilters;
