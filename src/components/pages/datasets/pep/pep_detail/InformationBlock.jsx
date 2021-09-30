import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';
import { scrollToRef } from './utils';

const InformationBlock = React.forwardRef((props, ref) => {
  const {
    title, children, titleIcon: Icon, color, setOpenBlock, blockId, open,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="intro-x box border border-gray-400 mt-6" ref={ref}>
      <div
        className={
          `flex items-center px-5 py-4 sm:py-3 border-b border-gray-400 cursor-pointer ${color} 
          sticky top-0 bg-white rounded-md`
        }
        onClick={() => setOpenBlock(blockId)}
      >
        <Icon />
        <h2 className="flex items-center font-medium text-base ml-3 mr-auto">
          {t(title)}
        </h2>
        {color === 'block-black' ? (
          <div className="flex flex-row">
            {open && open[blockId] ? (
              <Tooltip content={t('close')}>
                <ChevronUp
                  className="w-4 h-6"
                  onClick={() => scrollToRef(ref)}
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
      {open && open[blockId] && color === 'block-black' ? (
        <div className="p-6">
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
