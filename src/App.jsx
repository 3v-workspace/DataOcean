import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
import Api from 'api';
import { userLogin } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch();
  console.log(process.env);

  useEffect(() => {
    Api.get('rest-auth/profile/')
      .then((resp) => {
        dispatch(userLogin(resp.data));
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
