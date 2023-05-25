import { useMemo } from 'react';

import cn from 'lib/classnames';

import { climateRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useClimateRisks } from 'hooks/climate-risks';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

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

  const handleClearClick = () => {
    setClimateChange([]);
  };

  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !climateChange.length,
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

export default ClimateRisksSelected;
