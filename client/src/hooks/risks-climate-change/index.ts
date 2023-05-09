import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ClimateChangerisks } from 'types/risks-climate-change';

const DATA_JSON = [
  {
    id: 0,
    label: 'Not risked',
    value: -1,
  },
  {
    id: 1,
    label: 'Risked',
    value: 1,
  },
];

export function useClimateRisks(queryOptions: UseQueryOptions<ClimateChangerisks[], unknown> = {}) {
  const fetchRisksClimateChange = () => {
    return new Promise((resolve) => {
      resolve(DATA_JSON);
    });
  };

  const query = useQuery(['climate-change-climate-risk'], fetchRisksClimateChange, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
