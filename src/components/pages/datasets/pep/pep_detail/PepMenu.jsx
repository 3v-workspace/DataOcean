import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import { throttle } from 'throttle-debounce';
import { getColor, scrollToRef } from './utils';
import { pepBlocks } from './const';

const PepMenu = (props) => {
  const { config, mainBlock, setOpenBlock } = props;
  const scrollBlockRef = useRef({
    isBlocked: false,
    timeout: null,
  });
  const { t } = useTranslation();
  const [activeBlock, setActive] = useState(pepBlocks.MAIN_INFO);
  const MainInfoIcon = mainBlock.icon;
  const setActiveBlock = () => {
    const block = config.find((item) => (
      item.ref && item.ref.current &&
      item.ref.current.offsetTop <= window.pageYOffset &&
      item.ref.current.getBoundingClientRect().bottom > 0
    ));
    if (block) {
      setActive(block.id);
    }
    if (mainBlock.ref.current.offsetTop >= window.pageYOffset) {
      setActive(mainBlock.id);
    }
  };

  const setScrollBlock = () => {
    if (scrollBlockRef.current.isBlocked) {
      clearTimeout(scrollBlockRef.current.timeout);
    } else {
      scrollBlockRef.current.isBlocked = true;
    }
    scrollBlockRef.current.timeout = setTimeout(() => {
      scrollBlockRef.current.isBlocked = false;
    }, 1000);
  };

  const handleWindowScroll = throttle(250, false, () => {
    if (!scrollBlockRef.current.isBlocked) {
      setActiveBlock();
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return (
    <div
      className="box border border-gray-400 sticky top-1 xl:w-3/12"
      style={{ height: 'min-content' }}
    >
      <ul className="list-none py-1 lg:py-2">
        <li
          className={
            `flex items-center justify-center xl:justify-start block-black background-hover-gray
            lg:py-1 xl:py-2 xl:px-1 text-base cursor-pointer ${activeBlock === mainBlock.id ? 'pep-border' : ''}`
          }
          onClick={() => {
            setScrollBlock();
            scrollToRef(mainBlock.ref);
            setActive(mainBlock.id);
          }}
        >
          <Tooltip content={t('mainInformation')} position="left">
            <MainInfoIcon className="mx-3" />
          </Tooltip>
          <div className="hidden xl:flex">
            {t('mainInformation')}
          </div>
        </li>
        {config.map((info) => {
          const Icon = info.titleIcon;
          return (
            <li
              key={info.id}
              className={
                `flex items-center justify-center xl:justify-start cursor-pointer pt-1 lg:py-1 xl:py-2
                 xl:px-1 text-base ${getColor(info.blockProps.data)} 
                background-hover-gray ${activeBlock === info.id ? 'pep-border' : ''}`
              }
              onClick={() => {
                setScrollBlock();
                setOpenBlock(info.id, true);
                setActive(info.id);
                scrollToRef(info.ref);
              }}
            >
              <Tooltip content={t(info.title)} position="left">
                <Icon
                  className="mx-3"
                />
              </Tooltip>
              <div className="hidden xl:flex">
                {t(info.title)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

PepMenu.propTypes = {
  config: PropTypes.array,
  mainBlock: PropTypes.object.isRequired,
  setOpenBlock: PropTypes.func.isRequired,
};

PepMenu.defaultProps = {
  config: [],
};

export default PepMenu;
