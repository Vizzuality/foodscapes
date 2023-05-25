import type { NextApiRequest, NextApiResponse } from 'next';

export const DATA_JSON = [
  {
    id: 29,
    label: 'Areas suitable for cover cropping',
    value: 29,
    column: 'areas_suitable_for_cover_cropping_area',
    color: '#5C7746',
  },
  {
    id: 32,
    label: 'Areas suitable for minimum tillage',
    value: 32,
    column: 'areas_suitable_for_minimum_tillage_area',
    color: '#5C7746',
  },
];

const fetch = async () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON);
  });
};

const SoilHealths = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default SoilHealths;
