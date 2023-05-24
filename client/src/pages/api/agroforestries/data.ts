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
      .select(KNEX.raw("'cropland_areas_suitable_for_silvoarable_area' AS id"))
      .select(KNEX.raw('SUM(d.cropland_areas_suitable_for_silvoarable_area) AS value'))
      .select(
        KNEX.raw(
          '(SUM(d.cropland_areas_suitable_for_silvoarable_area) / (SELECT SUM(d.pixel_count) * 3086.9136)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'forest_ecoregions_suitable_for_silvopastoral_area' AS id"))
      .select(KNEX.raw('SUM(d.forest_ecoregions_suitable_for_silvopastoral_area) AS value'))
      .select(
        KNEX.raw(
          '(SUM(d.forest_ecoregions_suitable_for_silvopastoral_area) / (SELECT SUM(d.pixel_count) * 3086.9136)) * 100 as percentage'
        )
      )
      .from('data AS d')
      .whereNotIn('d.foodscapes', [1, 2, 3]),
    KNEX
      //
      .select(KNEX.raw("'tropical_grassland_ecoregions_suitable_for_silvopastoral_area' AS id"))
      .select(
        KNEX.raw('SUM(d.tropical_grassland_ecoregions_suitable_for_silvopastoral_area) AS value')
      )
      .select(
        KNEX.raw(
          '(SUM(d.tropical_grassland_ecoregions_suitable_for_silvopastoral_area) / (SELECT SUM(d.pixel_count) * 3086.9136)) * 100 as percentage'
        )
      )
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

const AgroforestriesData = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default AgroforestriesData;
