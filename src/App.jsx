import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
import Api from 'api';
import { userLogin } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';
import setLanguage from 'utils/setLanguage';
import { useDOCookies } from 'hooks';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch();
  const removeCookie = useDOCookies()[2];

  useEffect(() => {
    Api.get('rest-auth/user/')
      .then((resp) => {
        dispatch(userLogin(resp.data));
      })
      .catch(() => {
        removeCookie('token');
        removeCookie('firstname');
        removeCookie('lastname');
        removeCookie('email');
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
