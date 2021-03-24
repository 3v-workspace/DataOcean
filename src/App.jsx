import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
import Api from 'api';
import { userLogin } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';
import setLanguage from 'utils/setLanguage';
import { useCookies, withCookies } from 'react-cookie';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'firstname', 'lastname']);

  useEffect(() => {
    Api.get('rest-auth/user/')
      .then((resp) => {
        dispatch(userLogin(resp.data));
      })
      .catch(() => {
        removeCookie('token', { path: '/' });
        removeCookie('firstname', { path: '/' });
        removeCookie('lastname', { path: '/' });
      })
      .finally(() => {
        setLanguage();
        setIsInit(true);
      });
  }, []);

  if (isInit) {
    return <RootRoutes />;
  }
  return null;
};

export default App;
