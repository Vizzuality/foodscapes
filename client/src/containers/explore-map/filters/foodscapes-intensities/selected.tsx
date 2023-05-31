import { useMemo } from 'react';

import { filtersSelector, intensitiesAtom } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FoodscapeIntensityData } from 'types/data';

import { useData } from 'hooks/data';
import { useFoodscapesIntensities } from 'hooks/foodscapes-intensities';

import FilterSelected from 'containers/explore-map/filters/selected';

const IntensitiesSelected = () => {
  const filters = useRecoilValue(filtersSelector('intensities'));

  const intensities = useRecoilValue(intensitiesAtom);
  const setIntensities = useSetRecoilState(intensitiesAtom);

  const { data } = useData<FoodscapeIntensityData>('foodscapes-intensities', filters);

  const { data: intensitiesData, isFetched: intensitiesIsFetched } = useFoodscapesIntensities();

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

  const POPOVER_SELECTED = useMemo(() => {
    const selected = OPTIONS.filter((o) => intensities.includes(o.value));
    return selected;
  }, [OPTIONS, intensities]);

  const handleClearClick = (e) => {
    e.stopPropagation();
    setIntensities([]);
  };

  return (
    intensitiesIsFetched && (
      <FilterSelected
        text={SELECTED}
        popover={POPOVER_SELECTED}
        visible={!!intensities.length}
        onClear={handleClearClick}
      />
    )
  );
};

export default IntensitiesSelected;
