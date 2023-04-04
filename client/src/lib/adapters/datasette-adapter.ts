export interface DatasetteParamsProps {
  sql?: string;
  shape?: 'arrays' | 'objects' | 'array' | 'object';
}

export function datasetteAdapter(params: DatasetteParamsProps = {}) {
  const { sql, shape = 'array' } = params;

  return {
    // SQL
    sql,
    // Shape
    _shape: shape,
  };
}
