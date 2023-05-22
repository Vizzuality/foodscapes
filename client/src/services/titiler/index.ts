import axios from 'axios';

import env from 'env.mjs';

const API = axios.create({
  baseURL: `${env.NEXT_PUBLIC_TITILER_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

export default API;
