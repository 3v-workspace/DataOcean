import { useEffect } from 'react';
import { scrollToElement } from 'components/blocks/utils';

const useScrollToEffect = (location, data, position = 0) => {
  useEffect(() => {
    if (location.hash) {
      scrollToElement(location.hash.substr(1), position);
    } else {
      window.scrollTo(0, 0);
    }
  }, [data]);
};

export default useScrollToEffect;
