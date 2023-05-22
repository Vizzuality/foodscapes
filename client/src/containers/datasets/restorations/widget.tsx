import dynamic from 'next/dynamic';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { RestorationsData } from 'types/data';

import { useData } from 'hooks/data';
import { useRestorations } from 'hooks/restorations';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const RestorationsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'restorations');

  const filters = useRecoilValue(filtersSelector(null));

  const {
    isPlaceholderData: restorationIsPlaceholderData,
    isFetching: restorationIsFetching,
    isFetched: restorationIsFetched,
    isError: restorationIsError,
  } = useRestorations();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<RestorationsData>(
    'restorations',
    filters
  );

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        skeletonClassName="h-56"
        isPlaceholderData={isPlaceholderData || restorationIsPlaceholderData}
        isFetching={isFetching || restorationIsFetching}
        isFetched={isFetched && restorationIsFetched}
        isError={isError || restorationIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              This analysis specifically focuses on quantifying the possible atmospheric carbon
              removal benefit of such habitat restoration.
            </p>
          </div>

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <div className="w-full">
              <Chart ignore={null} />
            </div>
          </div>

          <WidgetTop label="See top foodscapes by restoration">
            <TopChart />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default RestorationsWidget;
