import { useCookies } from 'react-cookie';

const useDOCookies = (dependencies) => {
  const [cookies, setCookie, removeCookie] = useCookies(dependencies);

  const setDOCookie = (name, value, options) => {
    setCookie(name, value, {
      path: '/',
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
      maxAge: 604800,
      ...options,
    });
  };

  const removeDOCookie = (name, options) => {
    removeCookie(name, {
      path: '/',
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
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
