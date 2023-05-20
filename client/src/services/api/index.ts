import axios from 'axios';
import qs from 'query-string';

const API = axios.create({
  baseURL: `/api`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'none' });
  },
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
