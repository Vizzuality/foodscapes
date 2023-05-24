import dynamic from 'next/dynamic';

import { filtersSelector } from 'store/explore-map';

import { useRecoilValue } from 'recoil';

import { AgroforestriesData } from 'types/data';

import { useAgroforestries } from 'hooks/agroforestries';
import { useData } from 'hooks/data';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader } from 'containers/widget';

const Chart = dynamic(() => import('./chart'), { ssr: false });
// const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const AgroforestriesWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'agroforestries');

  const filters = useRecoilValue(filtersSelector(null));

  const {
    isPlaceholderData: agroforestriesIsPlaceholderData,
    isFetching: agroforestriesIsFetching,
    isFetched: agroforestriesIsFetched,
    isError: agroforestriesIsError,
  } = useAgroforestries();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<AgroforestriesData>(
    'agroforestries',
    filters
  );

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        skeletonClassName="h-56"
        isPlaceholderData={isPlaceholderData || agroforestriesIsPlaceholderData}
        isFetching={isFetching || agroforestriesIsFetching}
        isFetched={isFetched && agroforestriesIsFetched}
        isError={isError || agroforestriesIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              This analysis specifically focuses on quantifying the possible atmospheric carbon
              removal benefit of such habitat agroforestries.
            </p>
          </div>

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <div className="w-full">
              <Chart ignore={null} />
            </div>
          </div>

          {/* <WidgetTop label="See top foodscapes by agroforestries">
            <TopChart />
          </WidgetTop> */}
        </div>
      </WidgetContent>
    </section>
  );
};

export default AgroforestriesWidget;
