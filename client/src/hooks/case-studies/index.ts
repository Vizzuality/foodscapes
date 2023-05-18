import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CaseStudy } from 'types/case-studies';

const MOCKED_DATA_JSON = [
  {
    id: 0,
    title: 'Argentina Gran Chaco',
    subtitle: 'Halt biodiversity loss through mixed land use',
    image: '/images/stories/argentina-gran-chaco/granchaco-1.jpg',
  },
  {
    id: 1,
    title: 'Arkhangai',
    subtitle: 'Community-based conservation to protect range lands',
    image: '/images/stories/argentina-gran-chaco/granchaco-2.jpg',
  },
  {
    id: 2,
    title: 'Central New Zealand Aquaculture',
    subtitle: 'Aquaculture diversification for resilience',
    image: '/images/stories/argentina-gran-chaco/granchaco-3.jpg',
  },
  {
    id: 3,
    title: 'Chesapeake Bay Watershed',
    subtitle: 'Restore natural habitats to enhance success of nutrient reductions',
    image: '/images/stories/argentina-gran-chaco/granchaco-4.jpg',
  },
  {
    id: 4,
    title: 'East Kalimantan',
    subtitle: 'Protect and enhance habitat through adaptive land use',
    image: '/images/stories/argentina-gran-chaco/granchaco-1.jpg',
  },
  {
    id: 5,
    title: 'Granada',
    subtitle: 'Ensure climate resilience by promoting return to traditionally used practices',
    image: '/images/stories/argentina-gran-chaco/granchaco-2.jpg',
  },
];

export function useCaseStudies(queryOptions: UseQueryOptions<CaseStudy[], unknown> = {}) {
  const fetchCaseStudies = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCKED_DATA_JSON), 2000);
    });
  };

  const query = useQuery(['case-studies'], fetchCaseStudies, {
    placeholderData: [],
    ...queryOptions,
  });

  return query;
}
