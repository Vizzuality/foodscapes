import { ParamsProps } from './types';

export function datasetteAdapter(params: ParamsProps = {}) {
  const { sql, shape = 'array' } = params;

  return {
    // SQL
    sql,
    // Shape
    _shape: shape,
  };
}
