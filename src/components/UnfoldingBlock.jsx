import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'react-feather';

const UnfoldingBlock = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isOverflow, setOverflow] = useState(false);
  const { children } = props;
  const { t } = useTranslation();
  const unfoldingWindowRef = useRef(null);

  useEffect(() => {
    if (unfoldingWindowRef.current) {
      setOverflow(
        unfoldingWindowRef.current.scrollHeight > unfoldingWindowRef.current.offsetHeight,
      );
    }
  }, []);

  return (
    <>
      <div className={`overflow-y-hidden ${isOpen ? undefined : 'max-h-3'}`} ref={unfoldingWindowRef}>
        {children}
      </div>
      { isOverflow && (
        <div className="flex flex-row cursor-pointer text-blue-800" onClick={() => setOpen(!isOpen)}>
          {isOpen ? (
            <>
              <ChevronUp className="w-4 h-6" />
              {t('viewLess')}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-6" />
              {t('viewMore')}
            </>
          )}
        </div>
      ) }
    </>
  );
};

export default UnfoldingBlock;
