import {
  climateRiskAtom,
  filtersSelector,
  landUseRiskAtom,
  pollutionRiskAtom,
} from 'store/explore-map';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ClimateRiskData, LandUseRiskData, PollutionRiskData } from 'types/data';

import { useClimateRisks } from 'hooks/climate-risks';
import { useData } from 'hooks/data';
import { useLandUseRisks } from 'hooks/land-use-risks';
import { usePollutionRisks } from 'hooks/pollution-risks';

import FiltersContent from 'containers/explore-map/filters/content';

import Icon from 'components/icon';
import SingleSelect from 'components/ui/select/single/component';

import RISKS_SVG from 'svgs/tabs/tab-risks.svg?sprite';

const RisksFilters = () => {
  const landUseFilters = useRecoilValue(filtersSelector('landUseRisk'));
  const climateFilters = useRecoilValue(filtersSelector('climateRisk'));
  const pollutionFilters = useRecoilValue(filtersSelector('pollutionRisk'));

  const landUseRisk = useRecoilValue(landUseRiskAtom);
  const setLandUseRisk = useSetRecoilState(landUseRiskAtom);

  const climateChange = useRecoilValue(climateRiskAtom);
  const setClimateChange = useSetRecoilState(climateRiskAtom);

  const pollution = useRecoilValue(pollutionRiskAtom);
  const setPollution = useSetRecoilState(pollutionRiskAtom);

  const {
    data: landUseData,
    isPlaceholderData: landUseIsPlaceholderData,
    isFetching: landUseIsFetching,
    isFetched: landUseIsFetched,
    isError: landUseIsError,
  } = useLandUseRisks();

  const {
    data: climateData,
    isPlaceholderData: climateIsPlaceholderData,
    isFetching: climateIsFetching,
    isFetched: climateIsFetched,
    isError: climateIsError,
  } = useClimateRisks();

  const {
    data: pollutionData,
    isPlaceholderData: pollutionIsPlaceholderData,
    isFetching: pollutionIsFetching,
    isFetched: pollutionIsFetched,
    isError: pollutionIsError,
  } = usePollutionRisks();

  const {
    isPlaceholderData: landIsPlaceholderData,
    isFetching: landIsFetching,
    isFetched: landIsFetched,
    isError: landIsError,
  } = useData<LandUseRiskData>('land-use-risks', landUseFilters);

  const {
    isPlaceholderData: riskIsPlaceholderData,
    isFetching: riskIsFetching,
    isFetched: riskIsFetched,
    isError: riskIsError,
  } = useData<ClimateRiskData>('climate-risks', climateFilters);

  const {
    isPlaceholderData: pollutionRiskIsPlaceholderData,
    isFetching: pollutionRiskIsFetching,
    isFetched: pollutionRiskIsFetched,
    isError: pollutionRiskIsError,
  } = useData<PollutionRiskData>('pollution-risks', pollutionFilters);

  return (
    <div>
      <div className="flex items-center justify-center space-x-2">
        <Icon icon={RISKS_SVG} className="h-6 w-6 text-white" />
        <h3 className="font-display text-2xl">Risks</h3>
      </div>

      <FiltersContent
        isPlaceholderData={
          riskIsPlaceholderData ||
          climateIsPlaceholderData ||
          pollutionRiskIsPlaceholderData ||
          landUseIsPlaceholderData ||
          pollutionIsPlaceholderData ||
          landIsPlaceholderData
        }
        isFetching={
          riskIsFetching ||
          climateIsFetching ||
          pollutionRiskIsFetching ||
          landUseIsFetching ||
          pollutionIsFetching ||
          landIsFetching
        }
        isFetched={
          riskIsFetched &&
          climateIsFetched &&
          pollutionRiskIsFetched &&
          landUseIsFetched &&
          pollutionIsFetched &&
          landIsFetched
        }
        isError={
          riskIsError ||
          climateIsError ||
          pollutionRiskIsError ||
          landUseIsError ||
          pollutionIsError ||
          landIsError
        }
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-sans text-xs font-bold">Land use change</p>

            <SingleSelect
              id="riks-land-use-change-select"
              size="s"
              theme="dark"
              placeholder="Filter risk"
              options={landUseData}
              value={landUseRisk[0] ?? null}
              onChange={(value) => {
                if (value === null) {
                  setLandUseRisk([]);
                } else {
                  setLandUseRisk([value as number]);
                }
              }}
              clearable
            />
          </div>

          <div className="space-y-1">
            <p className="font-sans text-xs font-bold">Climate change</p>

            <SingleSelect
              id="riks-climate-change-select"
              size="s"
              theme="dark"
              placeholder="Climate risk"
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
          </div>

          <div className="space-y-1">
            <p className="font-sans text-xs font-bold">Pollution</p>

            <SingleSelect
              id="pollution-risk"
              size="s"
              theme="dark"
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
          </div>
        </div>
      </FiltersContent>
    </div>
  );
};

export default RisksFilters;
