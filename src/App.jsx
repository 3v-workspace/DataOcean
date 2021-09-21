import React, { useEffect, useState } from 'react';
import RootRoutes from 'components/RootRoutes';
import Api from 'api';
import { userLogin } from 'store/user/actionCreators';
import { useDispatch } from 'react-redux';
import setLanguage from 'utils/setLanguage';
import { useDOCookies } from 'hooks';
import DisplayWarning from 'components/DisplayWarning';
import { debounce } from 'throttle-debounce';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(window.innerWidth < 780);
  const dispatch = useDispatch();
  const removeCookie = useDOCookies()[2];

  useEffect(() => {
    Api.get('rest-auth/user/')
      .then((resp) => {
        dispatch(userLogin(resp.data));
      })
      .catch(() => {
        removeCookie('pt');
        removeCookie('token');
        removeCookie('firstname');
        removeCookie('lastname');
        removeCookie('email');
      })
      .finally(() => {
        setLanguage();
        setIsInit(true);
      });

    const checkWindowWidth = debounce(100, false, () => {
      setShowMobileWarning(window.innerWidth < 780);
    });
    window.addEventListener('resize', checkWindowWidth);
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, []);

  if (showMobileWarning) {
    return <DisplayWarning />;
  }

  if (isInit) {
    return <RootRoutes />;
  }
  return null;
};

export default App;
