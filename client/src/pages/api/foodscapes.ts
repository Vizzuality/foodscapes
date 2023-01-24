import prisma from 'lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';

// GET /api/foodscapes?soil_group[]=1,2,3,4
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const url = qs.parseUrl(req.url, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'bracket-separator',
    arrayFormatSeparator: ',',
  });

  const result = await prisma.foodscapes_filter_table.groupBy({
    by: ['foodscapes'],
    select: {
      foodscapes: true,
    },
    _sum: {
      pixel_count: true,
    },
    where: {
      soil_group: {
        in: url.query.soil_group,
      },
    },
  });
  res.json(result);
}
