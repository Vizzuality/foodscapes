import { useMemo } from 'react';

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

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<PollutionRiskData>(
    'pollution-risks',
    pollutionFilters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !pollutionData) return [];

    return pollutionData.map((c) => ({
      ...c,
      disabled: !data.find((d) => d.id === c.id)?.value,
    }));
  }, [data, pollutionData]);

  return (
    <div className="space-y-1">
      <p className="font-sans text-xs font-bold">Pollution</p>

      <FiltersContent
        skeletonClassname="h-[34px]"
        isPlaceholderData={isPlaceholderData || pollutionIsPlaceholderData}
        isFetching={isFetching || pollutionIsFetching}
        isFetched={isFetched && pollutionIsFetched}
        isError={isError || pollutionIsError}
      >
        <SingleSelect
          id="pollution-risk"
          size="s"
          theme="dark"
          placeholder="Select..."
          options={OPTIONS}
          loading={isFetching || pollutionIsFetching}
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
