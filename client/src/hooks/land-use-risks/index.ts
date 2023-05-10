import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { LandUseRisk } from 'types/land-use-risks';

const DATA_JSON = [
  {
    id: 6,
    label: 'Critically Endangered Ecosystems',
    value: 6,
    color: '#F0A38B',
  },
  {
    id: 7,
    label: 'Areas with High Conservation Value',
    value: 7,
    color: '#F0A38B',
  },
  {
    id: 8,
    label: 'Agricultural Frontier Zones',
    value: 8,
    color: '#F0A38B',
  },
  {
    id: 9,
    label: 'Soil Erosion',
    value: 9,
    color: '#F0A38B',
  },
  {
    id: 10,
    label: 'Water scarcity',
    value: 10,
    color: '#F0A38B',
  },
];

export function useLandUseRisks(queryOptions: UseQueryOptions<LandUseRisk[], unknown> = {}) {
  const fetchLandUseRisks = () => {
    return new Promise((resolve) => {
      resolve(DATA_JSON);
    });
  };

  const query = useQuery(['land-use-risk'], fetchLandUseRisks, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
