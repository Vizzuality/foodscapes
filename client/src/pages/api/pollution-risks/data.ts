import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import { FiltersProps } from 'types/data';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (filters: FiltersProps) => {
  const SQL = [
    KNEX
      //
      .select(KNEX.raw("'risk' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN pesticide_risk = 1 THEN pixel_count ELSE 0 END) AS value'))
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'not_risk' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN pesticide_risk = 0 THEN pixel_count ELSE 0 END) AS value'))
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
  ];

  return API.request({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...filters,
    }),
  }).then((response) => response.data);
};

const PollutionRisksData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filters = qs.parseUrl(req.url, {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'bracket-separator',
    }).query as FiltersProps;

    const result = await fetch(filters);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default PollutionRisksData;
