import axios from 'axios';

import env from 'env.mjs';

const API = axios.create({
  baseURL: `${env.NEXT_PUBLIC_TITILER_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  // transformResponse: (data) => {
  //   try {
  //     const parsedData = JSON.parse(data);
  //     return {
  //       data: dataFormatter.deserialize(parsedData),
  //       meta: parsedData.meta,
  //     };
  //   } catch (error) {
  //     return data;
  //   }
  // },
  // paramsSerializer: (prms) => {
  //   const parsedParams = Object.keys(prms).reduce((acc, key) => {
  //     // Convert key to snake_case
  //     const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

  //     return {
  //       ...acc,
  //       [snakeKey]: prms[key],
  //     };
  //   }, {});

  //   return qs.stringify(parsedParams, { arrayFormat: 'comma' });
  // },
});

// API.interceptors.response.use((response) => {
//   if (response.headers['content-type'].includes('application/json')) {
//     return {
//       ...response,
//       data: {
//         ...response.data,
//         data: !!response.data && dataFormatter.deserialize(response.data), // JSON API deserialize
//       },
//     };
//   }

//   return response;
// });

export default API;
