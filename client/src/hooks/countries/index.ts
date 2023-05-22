import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Country } from 'types/countries';

import API from 'services/api';

export function useCountries(queryOptions: UseQueryOptions<Country[], unknown> = {}) {
  const fetchCountries = () => {
    return API.request({
      method: 'GET',
      url: '/countries',
    }).then((response) => response.data);
  };

  const query = useQuery(['countries'], fetchCountries, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}

export function useCountry(id, queryOptions: UseQueryOptions<Country, unknown> = {}) {
  const fetchCountry = () => {
    return API.request({
      method: 'GET',
      url: `/countries/${id}`,
    }).then((response) => response.data);
  };

  const query = useQuery(['country', id], fetchCountry, {
    enabled: !!id,
    keepPreviousData: false,
    ...queryOptions,
  });

  return query;
}
