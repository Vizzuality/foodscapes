import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CaseStudy } from 'types/case-studies';

const MOCKED_DATA_JSON = [
  {
    id: 0,
    title: 'Argentina Gran Chaco',
    description: 'Halt biodiversity loss through mixed land use',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-1.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
  {
    id: 1,
    title: 'Arkhangai',
    description: 'Community-based conservation to protect range lands',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-2.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
  {
    id: 2,
    title: 'Central New Zealand Aquaculture',
    description: 'Aquaculture diversification for resilience',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-3.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
  {
    id: 3,
    title: 'Chesapeake Bay Watershed',
    description: 'Restore natural habitats to enhance success of nutrient reductions',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-4.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
  {
    id: 4,
    title: 'East Kalimantan',
    description: 'Protect and enhance habitat through adaptive land use',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-1.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
  {
    id: 5,
    title: 'Granada',
    description: 'Ensure climate resilience by promoting return to traditionally used practices',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut purus odio.',
    image: '/images/stories/argentina-gran-chaco/granchaco-2.jpg',
    geojson: { type: 'FeatureCollection', features: [] },
    bbox: [19.28714942900018, 39.657288000000165, 21.049087524000015, 42.65844345100004],
  },
] satisfies CaseStudy[];

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
