import axios from 'axios';
import qs from 'query-string';

const API = axios.create({
  baseURL: `/api`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => {
    console.log({
      params,
      'bracket-separator': qs.stringify(params, {
        arrayFormat: 'bracket-separator',
        arrayFormatSeparator: ',',
        skipNull: true,
        skipEmptyString: true,
      }),
      bracket: qs.stringify(params, {
        arrayFormat: 'bracket',
        arrayFormatSeparator: ',',
        skipNull: true,
        skipEmptyString: true,
      }),
      comma: qs.stringify(params, {
        arrayFormat: 'comma',
        arrayFormatSeparator: ',',
        skipNull: true,
        skipEmptyString: true,
      }),
      index: qs.stringify(params, {
        arrayFormat: 'index',
        arrayFormatSeparator: ',',
        skipNull: true,
        skipEmptyString: true,
      }),
      separator: qs.stringify(params, {
        arrayFormat: 'separator',
        arrayFormatSeparator: ',',
        skipNull: true,
        skipEmptyString: true,
      }),
    });
    return qs.stringify(params, {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: ',',
      skipNull: true,
      skipEmptyString: true,
    });
  },
  timeout: 10000,
  timeoutErrorMessage: 'Request timed out',
});

export default API;
