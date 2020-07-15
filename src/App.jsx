import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
import Api from 'api';
import { userLogin } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Api.get('rest-auth/user/')
      .then((resp) => {
        dispatch(userLogin(resp.data));
      })
      .catch(() => {
        window.localStorage.removeItem('token');
      })
      .finally(() => {
        setIsInit(true);
      });
  }, []);

  if (isInit) {
    return <RootRoutes />;
  }
  return null;
};

export default App;
