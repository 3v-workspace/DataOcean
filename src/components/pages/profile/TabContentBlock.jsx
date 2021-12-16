import React from 'react';
import PropTypes from 'prop-types';

const TabContentBlock = (props) => {
  const {
    title, headerContent, children, large, noPadding,
  } = props;

  return (
    <div className={`intro-y box col-span-12 ${large ? '' : 'lg:col-span-6'}`}>
      <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
        <h2 className="flex items-center font-medium text-base mr-auto">
          {title}
        </h2>
        {headerContent}
      </div>
      <div className={`${noPadding ? '' : 'p-5'}`}>
        {children}
      </div>
    </div>
  );
};

TabContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  headerContent: PropTypes.node,
  large: PropTypes.bool,
  noPadding: PropTypes.bool,
};
TabContentBlock.defaultProps = {
  headerContent: null,
  large: false,
  noPadding: false,
};

export default TabContentBlock;
