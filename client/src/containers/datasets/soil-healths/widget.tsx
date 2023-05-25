import dynamic from 'next/dynamic';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { SoilHealthsData } from 'types/data';

import { useData } from 'hooks/data';
import { useSoilHealths } from 'hooks/soil-healths';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader } from 'containers/widget';

const Chart = dynamic(() => import('./chart'), { ssr: false });
// const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const SoilHealthsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'soil-healths');

  const filters = useRecoilValue(filtersSelector(null));

  const {
    isPlaceholderData: soilHealthsIsPlaceholderData,
    isFetching: soilHealthsIsFetching,
    isFetched: soilHealthsIsFetched,
    isError: soilHealthsIsError,
  } = useSoilHealths();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<SoilHealthsData>(
    'soil-healths',
    filters
  );

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        skeletonClassName="h-56"
        isPlaceholderData={isPlaceholderData || soilHealthsIsPlaceholderData}
        isFetching={isFetching || soilHealthsIsFetching}
        isFetched={isFetched && soilHealthsIsFetched}
        isError={isError || soilHealthsIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              The analysis focuses on practices that build soil health and estimating the climate
              mitigation benefit of those practices through atmospheric carbon removal and storage
              in soils.
            </p>
          </div>

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <div className="w-full">
              <Chart ignore={null} />
            </div>
          </div>

          {/* <WidgetTop label="See top foodscapes by soilHealths">
            <TopChart />
          </WidgetTop> */}
        </div>
      </WidgetContent>
    </section>
  );
};

export default SoilHealthsWidget;
