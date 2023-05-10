import dynamic from 'next/dynamic';

import { climateRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ClimateRiskData } from 'types/data';

import { useClimateRisks } from 'hooks/climate-risks';
import { useData } from 'hooks/data';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const ClimateRiskWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'climate-risk');

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

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<ClimateRiskData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  const handleChartClick = (data) => {
    if (climateChange.includes(data.id)) {
      return setClimateChange([]);
    }

    setClimateChange([data.id]);
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
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              Intensity groups are inclusive of the land management attributes of an area.
            </p>
          </div>

          <SingleSelect
            id="riks-climate-change-select"
            size="s"
            theme="light"
            placeholder="Filter risk"
            options={climateData}
            value={climateChange[0] ?? null}
            onChange={(value) => {
              if (value === null) {
                setClimateChange([]);
              } else {
                setClimateChange([value as number]);
              }
            }}
            clearable
          />

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <p className="font-bold">Climate Risk</p>

            <div className="h-64 w-full">
              <Chart dataset={DATASET} selected={climateChange} onPieClick={handleChartClick} />
            </div>
          </div>

          <WidgetTop label="See top affected foodscapes by climate risk">
            <TopChart dataset={FOODSCAPES_DATASET} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default ClimateRiskWidget;
