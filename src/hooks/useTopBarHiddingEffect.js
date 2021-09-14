import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTopBarShow } from 'store/interface/actionCreators';

const useTopBarHiddingEffect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTopBarShow(false));
    return () => {
      dispatch(setTopBarShow(true));
    };
  }, []);
};

export default useTopBarHiddingEffect;
