import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Agroforestry } from 'types/agroforestries';

import API from 'services/api';

export const COLORS = ['#94C072', '#31442A'];

export function useAgroforestries(queryOptions: UseQueryOptions<Agroforestry[], unknown> = {}) {
  const fetchAgroforestries = () => {
    return API.request({
      method: 'GET',
      url: '/agroforestries',
    }).then((response) => response.data);
  };

  const query = useQuery(['agroforestries'], fetchAgroforestries, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
