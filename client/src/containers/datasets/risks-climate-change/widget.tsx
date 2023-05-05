import dynamic from 'next/dynamic';

import { RisksClimateData } from 'types/data';

import { useData } from 'hooks/data';
import { useRisksClimateChange } from 'hooks/risks-climate-change';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

const Chart = dynamic(() => import('./chart'), { ssr: false });

const RisksClimateChangeWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'climate-change-climate-risk');

  const {
    data: climateData,
    isPlaceholderData: climateIsPlaceholderData,
    isFetching: climateIsFetching,
    isFetched: climateIsFetched,
    isError: climateIsError,
  } = useRisksClimateChange();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<RisksClimateData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    // ...filters,
  });

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Land Use Change" dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={isPlaceholderData || climateIsPlaceholderData}
        isFetching={isFetching || climateIsFetching}
        isFetched={isFetched && climateIsFetched}
        isError={isError || climateIsError}
      >
        <div className="space-y-2">
          <p className="font-light">
            Intensity groups are inclusive of the land management attributes of an area.
          </p>
        </div>

        <div className="flex h-64 flex-col items-center text-xs">
          <p className="font-bold">Climate Risk</p>

          <Chart dataset={DATASET} selected />

          <p>
            <em>Showing </em>
            <b>
              <u>PROPORTION(%)</u>
            </b>
            / AREA (Mha)
          </p>
        </div>
      </WidgetContent>

      <WidgetTop label="See top affected foodscapes by climate risk">
        <p>test</p>
      </WidgetTop>
    </section>
  );
};

export default RisksClimateChangeWidget;
