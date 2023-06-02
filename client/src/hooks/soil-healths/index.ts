import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { SoilHealth } from 'types/soil-healths';

import API from 'services/api';

export const COLORS = ['#5C7746', '#1E2717'];

export function useSoilHealths(queryOptions: UseQueryOptions<SoilHealth[], unknown> = {}) {
  const fetchSoilHealths = () => {
    return API.request({
      method: 'GET',
      url: '/soil-healths',
    }).then((response) => response.data);
  };

  const query = useQuery(['soil-healths'], fetchSoilHealths, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
