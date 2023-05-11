import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PollutionRisk } from 'types/pollution-risks';

const DATA_JSON = [
  {
    id: 0,
    label: 'Not risk',
    value: -1,
    color: '#7B544700',
  },
  {
    id: 1,
    label: 'Risk',
    value: 1,
    color: '#7B5447',
  },
];

export function usePollutionRisks(queryOptions: UseQueryOptions<PollutionRisk[], unknown> = {}) {
  const fetchPollutionRisks = () => {
    return new Promise((resolve) => {
      resolve(DATA_JSON);
    });
  };

  const query = useQuery(['pollution-risk'], fetchPollutionRisks, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
