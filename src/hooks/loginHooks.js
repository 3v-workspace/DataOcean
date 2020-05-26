import { useSelector } from 'react-redux';

const useIsLogin = () => useSelector((state) => state.user.isLoggedIn);

export default useIsLogin;
