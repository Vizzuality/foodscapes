import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ClimateRisk } from 'types/climate-risks';

const DATA_JSON = [
  {
    id: 0,
    label: 'Not risk',
    value: -1,
    color: '#BF837000',
  },
  {
    id: 1,
    label: 'Risk',
    value: 1,
    color: '#BF8370',
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
