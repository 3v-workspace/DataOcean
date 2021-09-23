import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';

const InformationBlock = React.forwardRef((props, ref) => {
  const {
    title, children, titleIcon: Icon, color, setOpenBlock, blockId, open,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="intro-x box border border-gray-400 mt-5" ref={ref}>
      <div
        className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-400 cursor-pointer"
        onClick={() => setOpenBlock(blockId)}
      >
        <Icon fill={color} />
        <h2 className={`flex uppercase items-center font-medium text-base ml-1 mr-auto text-${color}-500`}>
          {title}
        </h2>
        {color === 'black' ? (
          <div className="flex flex-row text-blue-800">
            {open && open[blockId] ? (
              <Tooltip content={t('close')}>
                <ChevronUp className="w-4 h-6" />
              </Tooltip>
            ) : (
              <Tooltip content={t('open')}>
                <ChevronDown className="w-4 h-6" />
              </Tooltip>
            )}
          </div>
        ) : null}
      </div>
      {open && open[blockId] && color === 'black' ? (
        <div className="p-5">
          {children}
        </div>
      ) : null}
    </div>
  );
});

InformationBlock.propTypes = {
  blockId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  setOpenBlock: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
};
InformationBlock.defaultProps = {
  color: 'gray',
};

export default InformationBlock;
