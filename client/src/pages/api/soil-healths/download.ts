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
      .select(KNEX.raw("'areas_suitable_for_cover_cropping_area' AS id"))
      .select(KNEX.raw('SUM(d.areas_suitable_for_cover_cropping_area) AS ha'))
      .select(
        KNEX.raw(
          '(SUM(d.areas_suitable_for_cover_cropping_area) / (SELECT SUM(d.pixel_count) * 3086.9136)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'areas_suitable_for_minimum_tillage_area' AS id"))
      .select(KNEX.raw('SUM(d.areas_suitable_for_minimum_tillage_area) AS ha'))
      .select(
        KNEX.raw(
          '(SUM(d.areas_suitable_for_minimum_tillage_area) / (SELECT SUM(d.pixel_count) * 3086.9136)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
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

const SoilHealthsDownload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default SoilHealthsDownload;
