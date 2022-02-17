import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import showLess from 'images/showLess.svg';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import { throttle } from 'throttle-debounce';
import { STATUS_BLOCK } from 'components/pages/datasets/person/const';
import { getColor, scrollToElement } from 'components/blocks/utils';

const Menu = (props) => {
  const { config, mainBlock, setOpenBlock, position } = props;
  const scrollBlockRef = useRef({
    isBlocked: false,
    timeout: null,
  });
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [activeBlock, setActive] = useState(mainBlock.id);
  const MainInfoIcon = mainBlock.icon;
  const getElement = (id) => document.getElementById(id);
  const setActiveBlock = () => {
    const block = config.find((item) => (
      getElement(item.id) && getElement(item.id).offsetTop <= window.pageYOffset &&
      getElement(item.id).getBoundingClientRect().bottom > 0
    ));
    if (block) {
      setActive(block.id);
    }
    if (getElement(mainBlock.id).offsetTop >= window.pageYOffset) {
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
    <>
      <div
        className={`box border border-gray-400 sticky ${isOpen ? 'xl:w-3/12' : ''}`}
        style={{ height: 'min-content' }}
      >
        <ul
          className="list-none py-1 lg:py-2"
          style={{ minWidth: 56 }}
        >
          <img
            src={showLess}
            className={`hidden xl:block absolute mt-6 -ml-4 cursor-pointer ${!isOpen ? 'transform rotate-180' : ''}`}
            alt="less"
            onClick={() => setIsOpen(!isOpen)}
          />
          <li
            className={
              `flex items-center justify-center xl:justify-start block-black background-hover-gray h-11
              lg:py-1 xl:py-2 xl:px-1 text-base cursor-pointer ${activeBlock === mainBlock.id ? 'pep-border' : ''}`
            }
            onClick={() => {
              setScrollBlock();
              scrollToElement(mainBlock.id);
              setActive(mainBlock.id);
            }}
          >
            {!isOpen ? (
              <Tooltip
                content={t('mainInformation')}
                position={position}
              >
                <MainInfoIcon
                  className="mx-3"
                />
              </Tooltip>
            ) : (
              <>
                <Tooltip
                  content={t('mainInformation')}
                  position={position}
                  className="flex xl:hidden"
                >
                  <MainInfoIcon
                    className="mx-3"
                  />
                </Tooltip>
                <MainInfoIcon
                  className="mx-3 hidden xl:flex"
                />
                <div className="hidden xl:flex">
                  {t('mainInformation')}
                </div>
              </>
            )}
          </li>
          {config.map((info) => {
            const Icon = info.titleIcon;
            return (
              <li
                key={info.id}
                className={
                  `flex items-center justify-center ${isOpen ? 'xl:justify-start' : 'justify-center'} cursor-pointer h-11
                  pt-1 lg:py-1 xl:py-2 xl:px-1 text-base ${getColor(info.blockProps.data)}
                  background-hover-gray ${activeBlock === info.id ? 'pep-border' : ''}`
                }
                onClick={() => {
                  setScrollBlock();
                  setOpenBlock(info.id, true);
                  setActive(info.id);
                  scrollToElement(info.id);
                }}
              >
                {!isOpen ? (
                  <Tooltip
                    content={
                      t(info.status && info.status !== STATUS_BLOCK.isInformation ?
                        info.status : info.title)
                    }
                    position={position}
                    className="flex"
                  >
                    <Icon
                      className="mx-3"
                    />
                  </Tooltip>
                ) : (
                  <>
                    {info.status && info.status !== STATUS_BLOCK.isInformation ? (
                      <Tooltip
                        content={t(info.status)}
                        position={position}
                        className="flex"
                      >
                        <Icon
                          className="mx-3"
                        />
                        <div className="hidden xl:flex">
                          {t(info.title)}
                        </div>
                      </Tooltip>
                    ) : (
                      <>
                        <Tooltip
                          content={t(info.title)}
                          position={position}
                          className="flex xl:hidden"
                        >
                          <Icon
                            className="mx-3"
                          />
                        </Tooltip>
                        <Icon className="hidden xl:flex mx-3" />
                        <div className="hidden xl:flex">
                          {t(info.title)}
                        </div>
                      </>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

Menu.propTypes = {
  config: PropTypes.array,
  mainBlock: PropTypes.object.isRequired,
  setOpenBlock: PropTypes.func.isRequired,
  position: PropTypes.string,
};

Menu.defaultProps = {
  config: [],
  position: 'left',
};

export default Menu;
