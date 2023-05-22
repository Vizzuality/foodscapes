import { useCallback } from 'react';

import dynamic from 'next/dynamic';

import { landUseRiskAtom, filtersSelector } from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { RestorationsData } from 'types/data';

import { useData } from 'hooks/data';
import { useRestorations } from 'hooks/restorations';

import { DATASETS } from 'constants/datasets';

import { WidgetContent, WidgetHeader, WidgetTop } from 'containers/widget';

import SingleSelect from 'components/ui/select/single/component';

const Chart = dynamic(() => import('./chart'), { ssr: false });
const TopChart = dynamic(() => import('./chart/top'), { ssr: false });

const RestorationsWidget = () => {
  const DATASET = DATASETS.find((d) => d.id === 'restorations');

  const filters = useRecoilValue(filtersSelector('landUseRisk'));

  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setRestorations = useSetRecoilState(landUseRiskAtom);

  const {
    data: landUseData,
    isPlaceholderData: landUseIsPlaceholderData,
    isFetching: landUseIsFetching,
    isFetched: landUseIsFetched,
    isError: landUseIsError,
  } = useRestorations();

  const { isPlaceholderData, isFetching, isFetched, isError } = useData<RestorationsData>(
    'restorations',
    filters
  );

  const handleBarClick = useCallback(
    (v) => {
      if (landUseRisk.includes(v.id)) {
        return setRestorations([]);
      }

      return setRestorations([v.id]);
    },
    [landUseRisk, setRestorations]
  );

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
            options={landUseData}
            value={landUseRisk[0] ?? null}
            onChange={(value) => {
              if (value === null) {
                setRestorations([]);
              } else {
                setRestorations([value as number]);
              }
            }}
            clearable
          />

          <div className="space flex flex-col items-center space-y-2.5 py-2.5 text-xs">
            <div className="w-full">
              <Chart selected={landUseRisk} ignore={null} onBarClick={handleBarClick} />
            </div>
          </div>

          <WidgetTop label="See top affected foodscapes by land use risk">
            <TopChart />
          </WidgetTop>
        </div>
      </WidgetContent>
    </section>
  );
};

export default RestorationsWidget;
