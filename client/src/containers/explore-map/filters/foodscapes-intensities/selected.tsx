import { useMemo } from 'react';

import cn from 'lib/classnames';

import { filtersSelector, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

const IntensitiesSelected = () => {
  const filters = useRecoilValue(filtersSelector('intensities'));

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const { data } = useData<FoodscapeIntensityData>('foodscapes-intensities', filters);

  const { data: intensitiesData } = useFoodscapesIntensities();

  const OPTIONS = useMemo(() => {
    if (!data || !intensitiesData) return [];
    return intensitiesData.filter((c) => data.map((d) => d.id).includes(c.value));
  }, [data, intensitiesData]);

  const SELECTED = useMemo(() => {
    if (intensities.length === 1) {
      const opt = OPTIONS.find((o) => o.value === intensities[0]);

      return opt?.label;
    }

    if (intensities.length === OPTIONS.length) return 'All intensities';

    if (intensities.length > 1) return `${intensities.length} intensities`;

    return null;
  }, [OPTIONS, intensities]);

  const handleClearClick = () => {
    setIntensities([]);
  };

  return (
    <div
      className={cn({
        'flex items-center justify-between space-x-2 rounded-3xl bg-white p-1 pl-2': true,
        hidden: !intensities.length,
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

export default IntensitiesSelected;
