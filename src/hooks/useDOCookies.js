import { useCookies } from 'react-cookie';


export const REMOVE_COOKIE_OPTIONS = {
  path: '/',
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
};
export const SET_COOKIE_OPTIONS = {
  ...REMOVE_COOKIE_OPTIONS,
  maxAge: 604800,
};


const useDOCookies = (dependencies) => {
  const [cookies, setCookie, removeCookie] = useCookies(dependencies);

  const setDOCookie = (name, value, options) => {
    setCookie(name, value, {
      ...SET_COOKIE_OPTIONS,
      ...options,
    });
  };

  const removeDOCookie = (name, options) => {
    removeCookie(name, {
      ...REMOVE_COOKIE_OPTIONS,
      ...options,
    });
  };

  return [
    cookies,
    setDOCookie,
    removeDOCookie,
  ];
};

export default useDOCookies;
