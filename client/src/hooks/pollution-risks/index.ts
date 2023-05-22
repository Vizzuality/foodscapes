import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PollutionRisk } from 'types/pollution-risks';

import API from 'services/api';

export function usePollutionRisks(queryOptions: UseQueryOptions<PollutionRisk[], unknown> = {}) {
  const fetchPollutionRisks = () => {
    return API.request({
      method: 'GET',
      url: '/pollution-risks',
    }).then((response) => response.data);
  };

  const query = useQuery(['pollution-risks'], fetchPollutionRisks, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
