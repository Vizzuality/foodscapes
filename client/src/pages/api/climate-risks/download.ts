import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = [
    KNEX
      //
      .select(KNEX.raw("'risk' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN d.climate_risk = 1 THEN pixel_count ELSE 0 END) AS value'))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.climate_risk = 1 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.climate_risk = 1 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
    KNEX
      //
      .select(KNEX.raw("'not_risk' AS id"))
      .select(KNEX.raw('SUM(CASE WHEN climate_risk = 0 THEN pixel_count ELSE 0 END) AS value'))
      .select(
        KNEX.raw(
          'SUM(CASE WHEN d.climate_risk = 0 THEN d.pixel_count * 3086.9136 ELSE 0 END) AS ha'
        )
      )
      .select(
        KNEX.raw(
          '(SUM(CASE WHEN d.climate_risk = 0 THEN d.pixel_count ELSE 0 END) / (SELECT SUM(d.pixel_count) * 1.0)) * 100 as percentage'
        )
      )
      .from('data AS d'),
  ];

  return API.request({
    method: 'GET',
    url: '/foodscapes.csv',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
    }),
  }).then((response) => response.data);
};

const ClimateRisksDownload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default ClimateRisksDownload;
