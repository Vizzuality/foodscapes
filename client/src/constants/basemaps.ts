import env from 'env.mjs';

export const BASEMAPS = [
  {
    label: 'Clean',
    value: 'light',
    url: 'mapbox://styles/foodscapes/clisymb78003t01pncx558l3i',
    preview: `https://api.mapbox.com/styles/v1/foodscapes/clisymb78003t01pncx558l3i/static/-100,40,0/96x64?access_token=${env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&logo=false&attribution=false`,
  },
  {
    label: 'Satellite',
    value: 'satellite',
    url: 'mapbox://styles/foodscapes/cliu3unp700do01p7exykcqt3',
    preview: `https://api.mapbox.com/styles/v1/foodscapes/cliu3unp700do01p7exykcqt3/static/-100,40,0/96x64?access_token=${env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&logo=false&attribution=false`,
  },
];

export const LABELS = [
  {
    id: '1059d2b8cfa87b8d894b5373ea556666',
    name: 'labels-dark',
  },
  {
    id: '5924e7eeda116f817dd89f1d8d418721',
    name: 'labels-light',
  },
];

export const BOUNDARIES = [
  {
    id: 'ae861f3122c21ad7754e66d3cead38e6',
    name: 'boundaries-dark',
  },
  {
    id: '31b240eba06a254ade36f1dde6a3c07e',
    name: 'boundaries-light',
  },
];

export const ROADS = [
  {
    id: '4e240a8b884456747dcd07d41b4d5543',
    name: 'roads-dark',
  },
  {
    id: 'edb80ef589e776ec6c2568b2fc6ad74c',
    name: 'roads-light',
  },
];
