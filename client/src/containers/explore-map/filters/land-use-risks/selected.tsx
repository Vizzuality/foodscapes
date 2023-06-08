import { useMemo } from 'react';

import { landUseRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useLandUseRisks } from 'hooks/land-use-risks';

import FilterSelected from 'containers/explore-map/filters/selected';

const LandUseSelected = () => {
  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);

  const { data: landUseData, isFetched: landUseisFetched } = useLandUseRisks();

  const SELECTED = useMemo(() => {
    if (landUseRisk.length === 1) {
      const opt = landUseData.find((o) => o.value === landUseRisk[0]);
      return opt?.label;
    }

    if (landUseRisk.length === landUseData.length) return 'All Land use risks';

    if (landUseRisk.length > 1) return `${landUseRisk.length} Land use risks`;

    return null;
  }, [landUseData, landUseRisk]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setLandUseRisk([]);
  };

  return (
    landUseisFetched && (
      <FilterSelected text={SELECTED} visible={!!landUseRisk.length} onClear={handleClearClick} />
    )
  );
};

export default LandUseSelected;
