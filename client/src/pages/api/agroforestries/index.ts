import type { NextApiRequest, NextApiResponse } from 'next';

export const DATA_JSON = [
  {
    id: 20,
    label: 'Cropland areas suitable for silvoarable',
    value: 20,
    column: 'cropland_areas_suitable_for_silvoarable_area',
    color: '#94C072',
  },
  {
    id: 23,
    label: 'Forest ecoregions suitable for silvopastoral',
    value: 23,
    column: 'forest_ecoregions_suitable_for_silvopastoral_area',
    color: '#94C072',
  },
  {
    id: 26,
    label: 'Tropical grassland ecoregions suitable for silvopastoral',
    value: 26,
    column: 'tropical_grassland_ecoregions_suitable_for_silvopastoral_area',
    color: '#94C072',
  },
];

const fetch = async () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON);
  });
};

const Agroforestries = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Agroforestries;
