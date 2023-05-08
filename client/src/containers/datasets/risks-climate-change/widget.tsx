import dynamic from 'next/dynamic';

import { climateRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { RisksClimateData } from 'types/data';

import { useData } from 'hooks/data';
import { useClimateRisks } from 'hooks/risks-climate-change';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const RisksClimateChangeWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'climate-change-climate-risk');

  const FOODSCAPES_DATASET = DATASETS.find((d) => d.id === 'foodscapes');

  const filters = useRecoilValue(filtersSelector('climateRisk'));

  const climateChange = useRecoilValue(climateRiskAtom);
  const setClimateChange = useSetRecoilState(climateRiskAtom);

  const {
    data: climateData,
    isPlaceholderData: climateIsPlaceholderData,
    isFetching: climateIsFetching,
    isFetched: climateIsFetched,
    isError: climateIsError,
  } = useClimateRisks();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<RisksClimateData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  const handleChartClick = (data) => {
    const id = data.id === 0 ? -1 : data.id;
    setClimateChange([id]);
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title="Climate Change" dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={isPlaceholderData || climateIsPlaceholderData}
        isFetching={isFetching || climateIsFetching}
        isFetched={isFetched && climateIsFetched}
        isError={isError || climateIsError}
      >
        <div className="space-y-6 py-10">
          <div className="space-y-2">
            <p className="font-light">
              Intensity groups are inclusive of the land management attributes of an area.
            </p>
          </div>

          <div>
            <SingleSelect
              id="riks-climate-change-select"
              size="s"
              theme="light"
              placeholder="Filter risk"
              options={climateData}
              onChange={(value) => setClimateChange([value] as number[])}
              clearable
            />
          </div>

          <div className="flex h-64 flex-col items-center text-xs">
            <p className="font-bold">Climate Risk</p>

            <Chart dataset={DATASET} selected={climateChange} onPieClick={handleChartClick} />

            <p>
              <em>Showing </em>
              <b>
                <u>PROPORTION(%)</u>
              </b>
              / AREA (Mha)
            </p>
          </div>

          <WidgetTop label="See top affected foodscapes by climate risk">
            <TopChart dataset={FOODSCAPES_DATASET} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default RisksClimateChangeWidget;
