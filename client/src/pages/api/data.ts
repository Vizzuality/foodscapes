import prisma from 'lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // const { searchString } = req.query;

  const result = await prisma.foodscapes_filter_table.groupBy({
    by: ['foodscapes'],
    _sum: {
      pixel_count: true,
    },
    // where: {
    //   OR: [
    //     {
    //       title: { contains: Array.isArray(searchString) ? searchString[0] : searchString },
    //     },
    //     {
    //       content: { contains: Array.isArray(searchString) ? searchString[0] : searchString },
    //     },
    //   ],
    // },
  });
  res.json(result);
}
