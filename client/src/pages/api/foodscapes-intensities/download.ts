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
      'd.intensity_groups AS id',
      'f.label',
      'f.color',
      KNEX.raw('SUM(d.pixel_count) as value'),
      KNEX.raw('SUM(d.pixel_count * 3086.9136) as ha'),
      // percentage
      KNEX.raw(
        'ROUND((SUM(d.pixel_count * 3086.9136) / (SELECT SUM(pixel_count * 3086.9136) FROM data WHERE intensity_groups NOT IN (0))) * 100, 2) as percentage'
      )
    )
    .distinct()
    .from('data AS d')
    .whereNotIn('d.intensity_groups', [0])
    .groupBy('d.intensity_groups')
    .leftJoin('intensity_groups AS f', 'd.intensity_groups', 'f.value');

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
