import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Shadow, { resetScrollParams, checkScrollParams } from 'components/table/Shadow';
import { ChevronDown, ChevronUp } from 'react-feather';
import { throttle } from 'throttle-debounce';
import { scrollToElement } from 'components/blocks/utils';

const UnfoldingBlock = (props) => {
  const { data, blockId } = props;
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

  const setOverflowBlock = () => {
    if (unfoldingWindowRef.current?.scrollHeight > unfoldingWindowRef.current?.offsetHeight) {
      setOverflow(true);
    } else {
      setOverflow(false);
    }
  };

  useEffect(() => {
    const handleWindowResize = throttle(250, false, () => {
      if (window.innerWidth > 780) {
        resetScrollParams(unfoldingWindowRef, setScrollParams);
      }
      // setOverflowBlock();
    });
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    resetScrollParams(unfoldingWindowRef, setScrollParams);
    setOverflowBlock();
  }, [data]);


  return (
    <>
      <div className="p-6">
        <div className="relative">
          <Shadow scrollParams={scrollParams} />
          <div
            className="overflow-x-auto overflow-y-hidden p-px"
            ref={unfoldingWindowRef}
            style={{ maxHeight: `${isOpen ? '' : 'calc(100vh - 250px)'}` }}
            onScroll={() => checkScrollParams(unfoldingWindowRef, scrollParams, setScrollParams)}
          >
            {children}
          </div>
        </div>
      </div>
      { isOverflow && (
        <div
          className="flex justify-center blue cursor-pointer px-5 py-4 sm:py-3 bg-white border-t border-gray-400
          rounded-md font-medium text-base"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? (
            <div
              onClick={() => scrollToElement(blockId)}
              className="inline-flex"
            >
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

UnfoldingBlock.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  blockId: PropTypes.string.isRequired,
};

export default UnfoldingBlock;
