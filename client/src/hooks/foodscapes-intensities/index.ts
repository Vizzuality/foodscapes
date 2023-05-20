import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { FoodscapeIntensity } from 'types/foodscapes-intensities';

import API from 'services/api';

export function useFoodscapesIntensities(
  queryOptions: UseQueryOptions<FoodscapeIntensity[], unknown> = {}
) {
  const fetchFoodscapesIntensities = () => {
    return API.request({
      method: 'GET',
      url: '/foodscapes-intensities',
    }).then((response) => response.data);
  };

  const query = useQuery(['foodscapes-intensities'], fetchFoodscapesIntensities, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
