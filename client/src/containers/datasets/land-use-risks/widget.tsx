import { useCallback, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { GAEvent } from 'lib/analytics/ga';

import { landUseRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { LandUseRiskData } from 'types/data';

import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const LandUseRiskWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'land-use-risks');

  const filters = useRecoilValue(filtersSelector('landUseRisk'));

  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);

  const {
    data: landUseData,
    isPlaceholderData: landUseIsPlaceholderData,
    isFetching: landUseIsFetching,
    isFetched: landUseIsFetched,
    isError: landUseIsError,
  } = useLandUseRisks();

  const { data, isPlaceholderData, isFetching, isFetched, isError } = useData<LandUseRiskData>(
    'land-use-risks',
    filters
  );

  const OPTIONS = useMemo(() => {
    if (!data || !landUseData) return [];

    return landUseData.map((c) => ({
      ...c,
      disabled: !data.find((d) => d.id === c.column)?.value,
    }));
  }, [data, landUseData]);

  const handleBarClick = useCallback(
    (v) => {
      if (landUseRisk.includes(v.id)) {
        return setLandUseRisk([]);
      }

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'land_use_change',
          id: v.id,
          value: v.id ? landUseData?.find((c) => c.value === v.id)?.label : null,
          from: 'content',
        },
      });

      return setLandUseRisk([v.id]);
    },
    [landUseRisk, landUseData, setLandUseRisk]
  );

  const handleLandUseChange = (value) => {
    if (value === null) {
      setLandUseRisk([]);
    } else {
      setLandUseRisk([value as number]);

      GAEvent({
        action: 'filter_selected',
        params: {
          type: 'land_use_change',
          id: value,
          value: value ? landUseData?.find((c) => c.value === value)?.label : null,
          from: 'content',
        },
      });
    }
  };

  return (
    <section className="space-y-4 py-10">
      <WidgetHeader title={DATASET.label} dataset={DATASET} />
      <WidgetContent
        isPlaceholderData={isPlaceholderData || landUseIsPlaceholderData}
        isFetching={isFetching || landUseIsFetching}
        isFetched={isFetched && landUseIsFetched}
        isError={isError || landUseIsError}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-light">
              This analysis examines the relationships between land use changes and foodscapes by
              examining where and how foodscapes intersect with the following indices.
            </p>
          </div>

          <SingleSelect
            id="riks-land-use-change-select"
            size="s"
            theme="light"
            placeholder="Filter risk"
            options={OPTIONS}
            value={landUseRisk[0] ?? null}
            onChange={handleLandUseChange}
            clearable
          />

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <div className="w-full">
              <Chart selected={landUseRisk} ignore={null} onBarClick={handleBarClick} />
            </div>
          </div>

          <WidgetTop label="Top affected foodscapes by land use risk">
            <TopChart />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default LandUseRiskWidget;
