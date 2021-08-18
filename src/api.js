import axios from 'axios';
import { PROJECT_TOKEN_PREFIX } from 'const';
import toast from 'utils/toast';
import { Cookies } from 'react-cookie';
import { SET_COOKIE_OPTIONS } from 'hooks/useDOCookies';

export const baseApiUrl = process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '');

const Api = axios.create({
  baseURL: `${baseApiUrl}/api/`,
  // withCredentials: true,
  // timeout: 5000,
  // headers: {
  //   common: {
  //     'X-Custom-Header': 'foobar',
  //   },
  // },
});

Api.interceptors.request.use((config) => {
  const cookies = new Cookies(['token', 'lang', 'pt']);
  const lang = cookies.get('lang');
  if (config.useProjectToken) {
    let project_token = cookies.get('pt');
    if (!project_token) {
      project_token = window.localStorage.getItem('project_token');
      if (project_token) {
        cookies.set('pt', project_token, SET_COOKIE_OPTIONS);
      }
    }
    config.headers.Authorization = `${PROJECT_TOKEN_PREFIX} ${project_token}`;
  } else {
    const token = cookies.get('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
  }
  config.headers['Accept-Language'] = lang || 'uk';
  return config;
}, (error) => Promise.reject(error));

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status !== 403) {
      if (error.response.data && error.response.data.detail) {
        toast('error', error.response.data.detail);
      }
    }
    return Promise.reject(error);
  },
);

export const passErrorsToFormik = (error, formik) => {
  if (error.response && error.response.data) {
    Object.entries(error.response.data).forEach(([field, errors]) => {
      formik.setFieldError(field, errors[0]);
    });
  }
};


export default Api;
