import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Shadow from 'components/table/Shadow';
import { ChevronDown, ChevronUp } from 'react-feather';
import { debounce, throttle } from 'throttle-debounce';
import { scrollToRef } from './utils';

const PepUnfoldingBlock = (props) => {
  const { data, blockRef } = props;
  const [isOpen, setOpen] = useState(false);
  const [isOverflow, setOverflow] = useState(false);
  const { children } = props;
  const { t } = useTranslation();
  const [scrollParams, setScrollParams] = useState({
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  });
  const unfoldingWindowRef = useRef();


  const resetScrollParams = () => {
    setScrollParams({
      scrollLeft: unfoldingWindowRef.current.scrollLeft,
      offsetWidth: unfoldingWindowRef.current.offsetWidth,
      scrollWidth: unfoldingWindowRef.current.scrollWidth,
    });
  };

  const checkScrollParams = debounce(250, true, () => {
    if (scrollParams.scrollLeft !== unfoldingWindowRef.current.scrollLeft) {
      resetScrollParams();
    }
  });

  const setOverflowBlock = () => {
    if (unfoldingWindowRef.current.scrollHeight > unfoldingWindowRef.current.offsetHeight) {
      setOverflow(true);
    } else {
      setOverflow(false);
    }
  };

  useEffect(() => {
    const handleWindowResize = throttle(250, false, () => {
      if (window.innerWidth > 780) {
        resetScrollParams();
      }
      setOverflowBlock();
    });
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    resetScrollParams();
    setOverflowBlock();
  }, [data]);


  return (
    <>
      <Shadow
        scrollParams={scrollParams}
        top="53px"
        bottom={isOverflow ? '52px' : '0'}
      />
      <div className="p-6">
        <div
          className="overflow-x-auto overflow-y-hidden p-px"
          ref={unfoldingWindowRef}
          style={{ maxHeight: `${isOpen ? '' : 'calc(100vh - 250px)'}` }}
          onScroll={checkScrollParams}
        >
          {children}
        </div>
      </div>
      { isOverflow && (
        <div
          className="flex justify-center blue cursor-pointer px-5 py-4 sm:py-3 bg-white border-t border-gray-400
          rounded-md font-medium text-base"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? (
            <div onClick={() => scrollToRef(blockRef)} className="inline-flex">
              <ChevronUp className="w-4 h-6" />
              {t('less')}
            </div>
          ) : (
            <>
              <ChevronDown className="w-4 h-6" />
              {t('more')}
            </>
          )}
        </div>
      ) }
    </>
  );
};

PepUnfoldingBlock.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  blockRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};

export default PepUnfoldingBlock;
