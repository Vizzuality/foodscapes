import type { NextApiRequest, NextApiResponse } from 'next';

import { ClimateRisk } from 'types/climate-risks';

export const DATA_JSON = [
  {
    id: 'not_risk',
    label: 'Not risk',
    value: -1,
    color: '#BF837000',
  },
  {
    id: 'risk',
    label: 'Risk',
    value: 1,
    color: '#BF8370',
  },
] satisfies ClimateRisk[];

const fetch = async () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON);
  });
};

const ClimateRisks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default ClimateRisks;
