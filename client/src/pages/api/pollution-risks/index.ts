import type { NextApiRequest, NextApiResponse } from 'next';

import { ClimateRisk } from 'types/climate-risks';

export const DATA_JSON = [
  {
    id: 'not_risk',
    label: 'No pollution risk',
    value: -1,
    color: '#7B544700',
  },
  {
    id: 'risk',
    label: 'Pesticide Risk',
    value: 1,
    color: '#7B5447',
  },
] satisfies ClimateRisk[];

const fetch = async () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON);
  });
};

const PollutionRisks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default PollutionRisks;
