import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ClimateRisk } from 'types/climate-risks';

import API from 'services/api';

export function useClimateRisks(queryOptions: UseQueryOptions<ClimateRisk[], unknown> = {}) {
  const fetchClimateRisks = () => {
    return API.request({
      method: 'GET',
      url: '/climate-risks',
    }).then((response) => response.data);
  };

  const query = useQuery(['climate-risks'], fetchClimateRisks, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
