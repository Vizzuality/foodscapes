import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { GAEvent } from 'lib/analytics/ga';

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
  const DATASET = DATASETS.find((d) => d.id === 'climate-risks');

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

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<ClimateRiskData>(
    'climate-risks',
    filters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !climateData) return [];

    return climateData.map((c) => ({
      ...c,
      disabled: !data.find((d) => d.id === c.id)?.value,
    }));
  }, [data, climateData]);

  const handleChartClick = (d) => {
    if (climateChange.includes(d.id)) {
      return setClimateChange([]);
    }

    GAEvent({
      action: 'filter_selected',
      params: {
        type: 'climate_risk',
        id: d.id,
        value: d.id ? climateData?.find((c) => c.value === d.id)?.label : null,
        from: 'chart',
      },
    });

    setClimateChange([d.id]);
  };

  const handleClimateRiskChange = (value) => {
    if (value === null) {
      setClimateChange([]);
    } else {
      setClimateChange([value as number]);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'climate_risk',
          id: value,
          value: value ? climateData?.find((c) => c.value === value)?.label : null,
          from: 'content',
        },
      });
    }
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={isPlaceholderData || climateIsPlaceholderData}
        isFetching={isFetching || climateIsFetching}
        isFetched={isFetched && climateIsFetched}
        isError={isError || climateIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              This analysis explores the relationship between foodscapes and climate risk using a
              new global dataset of current and future climate risks to food production.
            </p>
          </div>

          <SingleSelect
            id="riks-climate-change-select"
            size="s"
            theme="light"
            placeholder="Filter risk"
            options={OPTIONS}
            value={climateChange[0] ?? null}
            loading={isFetching || climateIsFetching}
            onChange={handleClimateRiskChange}
            clearable
          />

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <p className="font-bold">Climate Risk</p>

            <div className="h-64 w-full">
              <Chart ignore={null} selected={climateChange} onPieClick={handleChartClick} />
            </div>
          </div>

          <WidgetTop label="Top affected foodscapes by climate risk">
            <TopChart dataset={FOODSCAPES_DATASET} />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default ClimateRiskWidget;
