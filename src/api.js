import axios from 'axios';

const Api = axios.create({
  baseURL: '/api/',
  // withCredentials: true,
  // timeout: 5000,
  // headers: {
  //   common: {
  //     'X-Custom-Header': 'foobar',
  //   },
  // },
});

Api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Api.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });


export default Api;
