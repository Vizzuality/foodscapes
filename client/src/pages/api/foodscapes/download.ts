import { datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async () => {
  const SQL = KNEX
    //
    .select(
      'd.foodscapes AS id',
      'f.label',
      'f.color',
      'd.soil_groups as parentId',
      'g.label as parentLabel',
      'g.color as parentColor',
      KNEX.raw('SUM(d.pixel_count) as value'),
      KNEX.raw('SUM(d.pixel_count * 3086.9136) as ha'),
      // percentage
      KNEX.raw(
        'ROUND((SUM(d.pixel_count * 3086.9136) / (SELECT SUM(pixel_count * 3086.9136) FROM data WHERE foodscapes NOT IN (1,2,3))) * 100, 2) as percentage'
      )
    )
    .distinct()
    .from('data AS d')
    .whereNotIn('d.foodscapes', [1, 2, 3])
    .groupBy('d.foodscapes')
    .leftJoin('foodscapes AS f', 'd.foodscapes', 'f.value')
    .leftJoin('soil_groups AS g', 'd.soil_groups', 'g.value');

  return API.request({
    method: 'GET',
    url: '/foodscapes.csv',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
    }),
    headers: {
      'Content-Type': 'text/csv',
    },
  }).then((response) => response.data);
};

const FoodscapesDownload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await fetch();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default FoodscapesDownload;
