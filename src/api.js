import axios from 'axios';

const Api = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
  // timeout: 5000,
  // headers: {
  //   common: {
  //     'X-Custom-Header': 'foobar',
  //   },
  // },
});

export default Api;
