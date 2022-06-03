import axios from 'axios'

const api = axios.create({
  baseURL: 'https://matchmaker-node.herokuapp.com/'
});

api.interceptors.request.use(async (config) => {
  console.log(`${config.method?.toUpperCase()} ${config.url}`)

  return config
}, (error) => {
  console.log(error)
  return Promise.reject(error)
});

api.interceptors.response.use(async (response) => response, (error) => {
  console.log(error, error.response.data)
  return Promise.reject(error)
});

export default api;
