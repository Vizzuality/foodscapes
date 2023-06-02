import type { NextApiRequest, NextApiResponse } from 'next';

export const DATA_JSON = [
  {
    id: 14,
    label: 'Cropland areas for restoration',
    value: 14,
    column: 'cropland_areas_suitable_for_restoration_area',
    color: '#B7F08B',
  },
  {
    id: 17,
    label: 'Grassland areas for restoration',
    value: 17,
    column: 'grassland_areas_suitable_for_restoration_area',
    color: '#B7F08B',
  },
];

const fetch = async () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON);
  });
};

const Restorations = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default Restorations;
