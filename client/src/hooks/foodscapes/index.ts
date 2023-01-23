import { useQuery } from '@tanstack/react-query';

import { useSQL } from 'hooks/sql';

export default function useFoodscapes() {
  const sql = useSQL();

  const query = useQuery(
    ['foodscapes'],
    () =>
      sql.get(
        'SELECT foodscapes, SUM(pixel_count) AS sum FROM foodscapes_filter_table GROUP BY foodscapes'
      ),
    {
      enabled: !!sql,
    }
  );

  return query;
}
