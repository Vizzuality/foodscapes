import { useMemo } from 'react';

import { cropsAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CropData } from 'types/data';

import { useCrops } from 'hooks/crops';
import { useData } from 'hooks/data';

import FiltersContent from 'containers/explore-map/filters/content';

import MultiSelect from 'components/ui/select/multi/component';

const CropsFilters = () => {
  const cropsFilters = useRecoilValue(filtersSelector('crops'));

  const crops = useRecoilValue(cropsAtom);
  const setCrops = useSetRecoilState(cropsAtom);

  const {
    data: cropsData,
    isPlaceholderData: cropsIsPlaceholderData,
    isFetching: cropsIsFetching,
    isFetched: cropsIsFetched,
    isError: cropsIsError,
  } = useCrops();

  const {
    data: cropData,
    isPlaceholderData: cropIsPlaceholderData,
    isFetching: cropIsFetching,
    isFetched: cropIsFetched,
    isError: cropIsError,
  } = useData<CropData>('crops', cropsFilters);

  const OPTIONS_CROPS = useMemo(() => {
    return cropsData.filter((c) => cropData.map((d) => d.id).includes(c.value));
  }, [cropData, cropsData]);

  return (
    <FiltersContent
      isPlaceholderData={cropsIsPlaceholderData || cropIsPlaceholderData}
      isFetching={cropsIsFetching || cropIsFetching}
      isFetched={cropsIsFetched && cropIsFetched}
      isError={cropsIsError || cropIsError}
    >
      <div className="space-y-1">
        <p className="font-sans text-xs font-bold">Crop production</p>

        <MultiSelect
          id="crops-multiselect"
          size="s"
          theme="dark"
          placeholder="Crops"
          options={OPTIONS_CROPS}
          values={crops as number[]}
          batchSelectionActive
          clearSelectionActive
          loading={cropsIsFetching || cropIsFetching}
          onChange={(values) => setCrops(values as number[])}
        />
      </div>
    </FiltersContent>
  );
};

export default CropsFilters;
