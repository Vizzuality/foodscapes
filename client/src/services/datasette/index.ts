import axios from 'axios';
import qs from 'query-string';

import env from 'env.mjs';

const API = axios.create({
  baseURL: `${env.NEXT_PUBLIC_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'none' });
  },
});

export default API;
