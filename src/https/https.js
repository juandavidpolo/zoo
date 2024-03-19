import axios from 'axios';

const https = axios.create()
https.interceptors.request.use((config) => {
  config.baseURL = "https://65f394fe105614e654a0ac9d.mockapi.io/api/v1/"
  config.headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
https.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default https;