import axios from 'axios';

export const baseUrl = process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '');

const Api = axios.create({
  baseURL: `${baseUrl}/api/`,
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
  const lang = window.localStorage.getItem('i18nextLng');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  config.headers['Accept-Language'] = lang || 'uk';
  return config;
}, (error) => Promise.reject(error));

// Api.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   return Promise.reject(error);
// });

export const passErrorsToFormik = (error, formik) => {
  if (error.response && error.response.data) {
    Object.entries(error.response.data).forEach(([field, errors]) => {
      formik.setFieldError(field, errors[0]);
    });
  }
};


export default Api;
