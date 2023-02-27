export const WIDGETS = [
  {
    label: 'Foodscapes',
    value: 'foodscapes',
    group: 'foodscapes',
    sql: `SELECT DISTINCT foodscapes, soil_groups, COUNT(pixel_count) AS pixel_count
    FROM foodscapes
    GROUP BY foodscapes, soil_groups`,
  },
];
