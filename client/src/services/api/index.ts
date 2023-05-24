import axios from 'axios';
import qs from 'query-string';

const API = axios.create({
  baseURL: `/api`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'bracket-separator', skipNull: true });
  },
  timeout: 10000,
  timeoutErrorMessage: 'Request timed out',
});

export default API;
