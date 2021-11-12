import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import PepUnfoldingBlock from './PepUnfoldingBlock';
import { scrollToRef, getColor } from './utils';

const InformationBlock = (props) => {
  const {
    children, setOpenBlock, open, block,
  } = props;
  const { t } = useTranslation();
  const Icon = block.titleIcon;
  const color = getColor(block.blockProps.data);

  return (
    <div className="intro-x box border border-gray-400 mt-6" ref={block.ref} id={block.id}>
      <div
        className={
          `flex items-center px-5 py-4 sm:py-3 border-b border-gray-400 cursor-pointer ${color} 
          sticky top-0 bg-white rounded-md z-10`
        }
        onClick={() => setOpenBlock(block.id)}
      >
        <Icon />
        <h2 className="flex items-center font-medium text-base ml-3 mr-auto">
          {t(block.title)}
        </h2>
        {color === 'block-black' ? (
          <div className="flex flex-row">
            {open && open[block.id] ? (
              <Tooltip content={t('close')}>
                <ChevronUp
                  className="w-4 h-6"
                  onClick={() => scrollToRef(block.ref)}
                />
              </Tooltip>
            ) : (
              <Tooltip content={t('open')}>
                <ChevronDown className="w-4 h-6" />
              </Tooltip>
            )}
          </div>
        ) : null}
      </div>
      {open && open[block.id] && color === 'block-black' ? (
        <PepUnfoldingBlock data={block.blockProps.data} blockRef={block.ref}>
          {children}
        </PepUnfoldingBlock>
      ) : null}
    </div>
  );
};

InformationBlock.propTypes = {
  block: PropTypes.object.isRequired,
  setOpenBlock: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
};

export default InformationBlock;
