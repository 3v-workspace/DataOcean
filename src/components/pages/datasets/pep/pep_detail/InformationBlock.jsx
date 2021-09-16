import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { useTranslation } from 'react-i18next';

const InformationBlock = React.forwardRef((props, ref) => {
  const {
    title, children, titleIcon: Icon, color,
  } = props;
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="intro-x box border border-gray-400 mt-5" ref={ref}>
      <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-400">
        <Icon fill={color} />
        <h2 className={`flex uppercase items-center font-medium text-base ml-1 mr-auto text-${color}-500`}>
          {title}
        </h2>
        {color === 'black' ? (
          <div className="flex flex-row text-blue-800" onClick={() => setOpen(!isOpen)}>
            {isOpen ? (
              <Tooltip content={t('close')}>
                <ChevronUp className="w-4 h-6 cursor-pointer" />
              </Tooltip>
            ) : (
              <Tooltip content={t('open')}>
                <ChevronDown className="w-4 h-6" />
              </Tooltip>
            )}
          </div>
        ) : null}
      </div>
      {isOpen ? (
        <div className="p-5">
          {children}
        </div>
      ) : null}
    </div>
  );
});

InformationBlock.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
};
InformationBlock.defaultProps = {
  color: 'gray',
};

export default InformationBlock;
