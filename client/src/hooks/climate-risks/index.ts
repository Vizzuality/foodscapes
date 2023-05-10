import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ClimateRisk } from 'types/climate-risks';

const DATA_JSON = [
  {
    id: 0,
    label: 'Not risked',
    value: -1,
    color: '#F0A38B00',
  },
  {
    id: 1,
    label: 'Risked',
    value: 1,
    color: '#F0A38B',
  },
];

export function useClimateRisks(queryOptions: UseQueryOptions<ClimateRisk[], unknown> = {}) {
  const fetchRisksClimateChange = () => {
    return new Promise((resolve) => {
      resolve(DATA_JSON);
    });
  };

  const query = useQuery(['climate-risk'], fetchRisksClimateChange, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}