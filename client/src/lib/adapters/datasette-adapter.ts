import { Select } from 'squel';

import { FiltersProps } from 'types/data';
export interface DatasetteParamsProps extends FiltersProps {
  sql?: Select;
  shape?: 'arrays' | 'objects' | 'array' | 'object';
  size?: number | 'max';
}

export function datasetteAdapter(params: DatasetteParamsProps = {}) {
  const {
    sql,
    foodscapes = [],
    intensities = [],
    crops = [],
    shape = 'array',
    size = 'max',
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

  // if (!!landUseRisk?.length) {

  // }

  return {
    // SQL
    sql: s?.toString(),
    // Shape
    _shape: shape,
    // Size
    _size: size,
  };
}
