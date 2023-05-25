import { useMemo } from 'react';

import cn from 'lib/classnames';

import { landUseRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useLandUseRisks } from 'hooks/land-use-risks';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const LandUseSelected = () => {
  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);

  const { data: landUseData } = useLandUseRisks();

  const SELECTED = useMemo(() => {
    if (landUseRisk.length === 1) {
      const opt = landUseData.find((o) => o.value === landUseRisk[0]);
      return opt?.label;
    }

    if (landUseRisk.length === landUseData.length) return 'All Land use risks';

    if (landUseRisk.length > 1) return `${landUseRisk.length} Land use risks`;

    return null;
  }, [landUseData, landUseRisk]);

  const handleClearClick = () => {
    setLandUseRisk([]);
  };

  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !landUseRisk.length,
      })}
    >
      <p className="text-xs font-bold uppercase text-navy-500">{SELECTED}</p>

      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-navy-500 p-1"
        onClick={handleClearClick}
      >
        <Icon icon={CLOSE_SVG} className="h-3 w-3 text-white" />
      </button>
    </div>
  );
};

export default LandUseSelected;
