import { Knex } from 'knex';

import { FiltersProps, PaginationProps, SortProps } from 'types/data';

import { DATA_JSON as LAND_USER_RISKS_DATA } from 'pages/api/land-use-risks';

export interface DatasetteParamsProps extends FiltersProps, SortProps, PaginationProps {
  sql?: Knex.QueryBuilder | Knex.QueryBuilder[];
  shape?: 'arrays' | 'objects' | 'array' | 'object';
  size?: number | 'max';
  json?: string[];
}

export function datasetteAdapter(params: DatasetteParamsProps = {}) {
  const {
    sql,
    foodscapes = [],
    intensities = [],
    crops = [],
    landUseRisk = [],
    climateRisk = [],
    pollutionRisk = [],
    country,
    province,
    caseStudy,
    sortBy,
    sortDirection,
    shape = 'array',
    size = 'max',
    limit,
    offset,
    json,
  } = params;

  const SQL = Array.isArray(sql) ? sql : [sql];

  const s = SQL.reduce((acc, query) => {
    // Foodscapes
    if (!!foodscapes.length) {
      query.whereIn('foodscapes', foodscapes);
    }

    // Intensities
    if (!!intensities?.length) {
      query.whereIn('intensity_groups', intensities);
    }

    // Crops
    if (!!crops?.length) {
      query.whereIn('crops', crops);
    }

    // Country
    if (!!country) {
      query.where({ country });
    }

    // Province
    if (!!province) {
      query.where({ province });
    }

    if (!!caseStudy) {
      query.where({
        case_studies: caseStudy,
      });
    }

    if (!!landUseRisk?.length) {
      const risks = LAND_USER_RISKS_DATA
        // Filter the land use risks by the selected ones
        .filter((d) => landUseRisk.includes(d.value));

      query.where((q) => {
        risks.forEach((r) => {
          q.orWhere({
            [r.column]: 1,
          });
        });
      });
    }

    if (!!climateRisk?.length) {
      query.where({
        climate_risk: climateRisk[0] === -1 ? 0 : 1,
      });
    }

    if (!!pollutionRisk?.length) {
      query.where({
        pesticide_risk: pollutionRisk[0] === -1 ? 0 : 1,
      });
    }

    // Sort
    if (!!sortBy) {
      query.orderBy(sortBy, sortDirection ?? 'desc');
    }

    // Pagination
    if (!!limit) {
      query.limit(limit);
    }

    if (!!offset) {
      query.offset(offset);
    }

    if (acc) {
      return acc.union(query);
    }

    return query;
  }, null as Knex.QueryBuilder);

  return {
    // SQL
    sql: s.toString(),
    // Shape
    _shape: shape,
    // Size
    _size: size,
    // JSON
    ...(json && { _json: json }),
  };
}
