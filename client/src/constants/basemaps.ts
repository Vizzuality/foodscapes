export const BASEMAPS = [
  {
    label: 'Clean',
    value: 'light',
    url: 'mapbox://styles/afilatore90/cjuvfwn1heng71ftijvnv2ek6',
    preview: `https://api.mapbox.com/styles/v1/afilatore90/cjuvfwn1heng71ftijvnv2ek6/static/-100,40,0/80x66?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&logo=false&attribution=false`,
  },
  {
    label: 'Satellite',
    value: 'satellite',
    url: 'mapbox://styles/afilatore90/cjuii5qp93u5i1fm7tzsclkvf',
    preview: `https://api.mapbox.com/styles/v1/afilatore90/cjuii5qp93u5i1fm7tzsclkvf/static/-100,40,0/80x66?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&logo=false&attribution=false`,
  },
  {
    label: 'OpenStreetMap',
    value: 'open-street-map',
    url: 'mapbox://styles/afilatore90/cle2kx0wv003601oggtxuquv0',
    preview: `https://api.mapbox.com/styles/v1/afilatore90/cle2kx0wv003601oggtxuquv0/static/-100,40,0/80x66?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}&logo=false&attribution=false`,
  },
];
