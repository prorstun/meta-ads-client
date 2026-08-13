const axios = require('axios');
require('dotenv').config();

const apiRequest = axios.create({
  baseURL: 'https://graph.facebook.com/v19.0/'
});

apiRequest.interceptors.request.use((config) => {
  const token = process.env.META_ACCESS_TOKEN;
  if (token) {
    config.params = config.params || {};
    config.params.access_token = token;
  }
  return config;
});

module.exports = apiRequest;
