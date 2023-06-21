import env from 'env.mjs';

export const MAPBOX_STYLES = {
  explore: env.NEXT_PUBLIC_API_URL.includes('globalfoodscapes.org')
    ? 'mapbox://styles/tncmapbox/clj4ay7fx01l901qidzl1dvgf'
    : 'mapbox://styles/foodscapes/clisymb78003t01pncx558l3i',
  globe: env.NEXT_PUBLIC_API_URL.includes('globalfoodscapes.org')
    ? 'mapbox://styles/tncmapbox/clj4b2iun036l01qp9x66aw11'
    : 'mapbox://styles/foodscapes/clivj2bff00be01qyfvuq31hr',
};

export const MAPBOX_TILESETS = {
  protected_areas: env.NEXT_PUBLIC_API_URL.includes('globalfoodscapes.org')
    ? 'mapbox://tncmapbox.c16ky46z'
    : 'mapbox://foodscapes.895aslht',
  river_basins: env.NEXT_PUBLIC_API_URL.includes('globalfoodscapes.org')
    ? 'mapbox://tncmapbox.2233n9ch'
    : 'mapbox://foodscapes.b2j4aojt',
};
