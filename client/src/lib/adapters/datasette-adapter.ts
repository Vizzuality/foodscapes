import { Select } from 'squel';
export interface DatasetteParamsProps {
  sql?: Select;
  foodscapes?: readonly number[];
  intensities?: readonly number[];
  crops?: readonly number[];
  country?: number;
  province?: number;
  shape?: 'arrays' | 'objects' | 'array' | 'object';
  size?: number | 'max';
  json?: string;
}

export function datasetteAdapter(params: DatasetteParamsProps = {}) {
  const {
    sql,
    foodscapes = [],
    intensities = [],
    crops = [],
    country,
    province,
    shape = 'array',
    size = 'max',
    json,
  } = params;
  const s = sql?.clone();

  // Foodscapes
  if (!!foodscapes.length) {
    s.where('foodscapes IN ?', foodscapes);
  }

  // Intensities
  if (!!intensities?.length) {
    s.where('intensity_groups IN ?', intensities);
  }

  // Intensities
  if (!!crops?.length) {
    s.where('crops IN ?', crops);
  }

  // Country
  if (!!country) {
    s.where('country = ?', country);
  }

  // Province
  if (!!province) {
    s.where('province = ?', province);
  }

  return {
    // SQL
    sql: s?.toString(),
    // Shape
    _shape: shape,
    // Size
    _size: size,
    // JSON
    ...(json && { _json: json }),
  };
}
