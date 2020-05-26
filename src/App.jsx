import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { userLogin } from 'store/user/actionCreators';

const App = () => {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const [isInit, setIsInit] = useState(false);

  // if (!user.isLoggedIn) {
  //   setTimeout(() => {
  //     dispatch(userLogin({
  //       email: 'admin@admin.com',
  //     }));
  //     setIsInit(true);
  //   }, 500);
  // }

  useEffect(() => {
    // TODO: auth/profile/
    setTimeout(() => {
      // dispatch(userLogin({
      //   email: 'admin@admin.com',
      // }));
      setIsInit(true);
    }, 500);
  }, []);

  if (isInit) {
    return <RootRoutes />;
  }
  return null;
};

export default App;
