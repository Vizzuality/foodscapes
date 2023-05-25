import { useMemo } from 'react';

import cn from 'lib/classnames';

import { pollutionRiskAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { usePollutionRisks } from 'hooks/pollution-risks';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const PollutionRisksSelected = () => {
  const pollution = useRecoilValue(pollutionRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const { data: pollutionData } = usePollutionRisks();

  const SELECTED = useMemo(() => {
    if (pollution.length === 1) {
      const opt = pollutionData.find((o) => o.value === pollution[0]);
      return opt?.label;
    }

    if (pollution.length === pollutionData.length) return 'All Land use risks';

    if (pollution.length > 1) return `${pollution.length} Land use risks`;

    return null;
  }, [pollutionData, pollution]);

  const handleClearClick = () => {
    setPollution([]);
  };

  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !pollution.length,
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

export default PollutionRisksSelected;
