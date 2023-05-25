import { DatasetteParamsProps, datasetteAdapter } from 'lib/adapters/datasette-adapter';

import knex from 'knex';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

import { FoodscapeData } from 'types/data';

import API from 'services/datasette';

const KNEX = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
});

const fetch = async (params: DatasetteParamsProps) => {
  const SQL = KNEX
    //
    .select('d.foodscapes AS id', 'd.soil_groups AS parent_id')
    .sum('d.pixel_count AS value')
    .distinct()
    .from('data AS d')
    .whereNotIn('d.foodscapes', [1, 2, 3])
    .groupBy('d.foodscapes');

  console.log(
    datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...params,
    })
  );
  return API.request<FoodscapeData[]>({
    method: 'GET',
    url: '/foodscapes.json',
    params: datasetteAdapter({
      sql: SQL,
      shape: 'array',
      ...params,
    }),
  }).then((response) => response.data);
};

const FoodscapesData = async (
  req: NextApiRequest,
  res: NextApiResponse<FoodscapeData[] | { error: string }>
) => {
  try {
    const params = qs.parseUrl(decodeURIComponent(req.url), {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
    }).query as DatasetteParamsProps;

    console.log({
      url: req.url,
      query: req.query,
      'bracket-separator': qs.parseUrl(req.url, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'bracket-separator',
        arrayFormatSeparator: ',',
      }).query,
      bracket: qs.parseUrl(req.url, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'bracket',
        arrayFormatSeparator: ',',
      }).query,
      comma: qs.parseUrl(req.url, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'comma',
        arrayFormatSeparator: ',',
      }).query,
      index: qs.parseUrl(req.url, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'index',
        arrayFormatSeparator: ',',
      }).query,
      separator: qs.parseUrl(req.url, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: 'separator',
        arrayFormatSeparator: ',',
      }).query,
    });

    const result = await fetch(params);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
};

export default FoodscapesData;
