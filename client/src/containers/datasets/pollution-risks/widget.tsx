import { useMemo } from 'react';

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
  const DATASET = DATASETS.find((d) => d.id === 'pollution-risks');

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

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<PollutionRiskData>(
    'pollution-risks',
    filters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !pollutionData) return [];

    return pollutionData.map((c) => ({
      ...c,
      disabled: !data.find((d) => d.id === c.id)?.value,
    }));
  }, [data, pollutionData]);

  const handleChartClick = (d) => {
    if (pollution.includes(d.id)) {
      return setPollution([]);
    }

    setPollution([d.id]);
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
            options={OPTIONS}
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
              <Chart selected={pollution} ignore={null} onPieClick={handleChartClick} />
            </div>
          </div>

          <WidgetTop label="Top affected foodscapes by pollution">
            <TopChart />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default PollutionRiskWidget;
