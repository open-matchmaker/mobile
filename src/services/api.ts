import axios from 'axios'
import Constants from 'expo-constants';

const api = axios.create({
  baseURL: Constants.manifest?.extra?.REACT_APP_API_URL || 'http://localhost:3333',
});

api.interceptors.request.use(async (config) => {
  console.info(`${config.method?.toUpperCase()} ${config.url}`)

  return config
}, (error) => {
  console.warn(error)
  return Promise.reject(error)
});

export default api;
