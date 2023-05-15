import dynamic from 'next/dynamic';

import { pollutionRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { PollutionRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { usePollutionRisks } from 'hooks/pollution-risks';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const PollutionRiskWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'pollution-risk');

  const FOODSCAPES_DATASET = DATASETS.find((d) => d.id === 'foodscapes');

  const filters = useRecoilValue(filtersSelector('pollutionRisk'));

  const pollution = useRecoilValue(pollutionRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const {
    data: pollutionData,
    isPlaceholderData: pollutionIsPlaceholderData,
    isFetching: pollutionIsFetching,
    isFetched: pollutionIsFetched,
    isError: pollutionIsError,
  } = usePollutionRisks();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<PollutionRiskData>({
    sql: DATASET.widget.sql,
    shape: 'array',
    ...filters,
  });

  const handleChartClick = (data) => {
    if (pollution.includes(data.id)) {
      return setPollution([]);
    }

    setPollution([data.id]);
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={isPlaceholderData || pollutionIsPlaceholderData}
        isFetching={isFetching || pollutionIsFetching}
        isFetched={isFetched && pollutionIsFetched}
        isError={isError || pollutionIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              This analysis examines where and how foodscapes are affected by one important form of
              pollution directly linked to food production, nitrogen pollution.
            </p>
          </div>

          <SingleSelect
            id="pollution-risk"
            size="s"
            theme="light"
            placeholder="Filter risk"
            options={pollutionData}
            value={pollution[0] ?? null}
            onChange={(value) => {
              if (value === null) {
                setPollution([]);
              } else {
                setPollution([value as number]);
              }
            }}
            clearable
          />

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <p className="font-bold">Pesticide Risk</p>

            <div className="h-64 w-full">
              <Chart dataset={DATASET} selected={pollution} onPieClick={handleChartClick} />
            </div>
          </div>

          <WidgetTop label="See top affected foodscapes by pollution">
            <TopChart dataset={FOODSCAPES_DATASET} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default PollutionRiskWidget;
