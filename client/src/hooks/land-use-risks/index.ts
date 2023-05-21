import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { LandUseRisk } from 'types/land-use-risks';

import { ColorHex } from 'types';

import API from 'services/api';

export const COLORS = ['#f0a38b', '#dd675c', '#ca2c2d', '#b40000', '#720101'] satisfies ColorHex[];

export function useLandUseRisks(queryOptions: UseQueryOptions<LandUseRisk[], unknown> = {}) {
  const fetchLandUseRisks = () => {
    return API.request({
      method: 'GET',
      url: '/land-use-risks',
    }).then((response) => response.data);
  };

  const query = useQuery(['land-use-risks'], fetchLandUseRisks, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
