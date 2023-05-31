import { useMemo } from 'react';

import { climateRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useClimateRisks } from 'hooks/climate-risks';

import FilterSelected from 'containers/explore-map/filters/selected';

const ClimateRisksSelected = () => {
  const climateChange = useRecoilValue(climateRiskAtom);
  const setClimateChange = useSetRecoilState(climateRiskAtom);

  const { data: climateData } = useClimateRisks();

  const SELECTED = useMemo(() => {
    if (climateChange.length === 1) {
      const opt = climateData.find((o) => o.value === climateChange[0]);
      return opt?.label;
    }

    if (climateChange.length === climateData.length) return 'All Climate change risks';

    if (climateChange.length > 1) return `${climateChange.length} Climate change risks`;

    return null;
  }, [climateData, climateChange]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setClimateChange([]);
  };

  return (
    <FilterSelected text={SELECTED} visible={!!climateChange.length} onClear={handleClearClick} />
  );
};

export default ClimateRisksSelected;
