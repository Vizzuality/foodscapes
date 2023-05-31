import { useMemo } from 'react';

import { pollutionRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { usePollutionRisks } from 'hooks/pollution-risks';

import FilterSelected from 'containers/explore-map/filters/selected';

const PollutionRisksSelected = () => {
  const pollution = useRecoilValue(pollutionRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const { data: pollutionData, isFetched: pollutionIsFetched } = usePollutionRisks();

  const SELECTED = useMemo(() => {
    if (pollution.length === 1) {
      const opt = pollutionData.find((o) => o.value === pollution[0]);
      return opt?.label;
    }

    if (pollution.length === pollutionData.length) return 'All Land use risks';

    if (pollution.length > 1) return `${pollution.length} Land use risks`;

    return null;
  }, [pollutionData, pollution]);

  const POPOVER_SELECTED = useMemo(() => {
    const selected = pollutionData.filter((o) => pollution.includes(o.value));
    return selected;
  }, [pollutionData, pollution]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setPollution([]);
  };

  return (
    pollutionIsFetched && (
      <FilterSelected
        text={SELECTED}
        popover={POPOVER_SELECTED}
        visible={!!pollution.length}
        onClear={handleClearClick}
      />
    )
  );
};

export default PollutionRisksSelected;
