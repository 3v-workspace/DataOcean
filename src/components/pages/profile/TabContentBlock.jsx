import React from 'react';
import { MoreHorizontal } from 'react-feather';
import PropTypes from 'prop-types';

const TabContentBlock = (props) => {
  const {
    title, headerContent, children, large,
  } = props;

  return (
    <div className={`intro-y box col-span-12 ${large ? '' : 'lg:col-span-6'}`}>
      <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
        <h2 className="font-medium text-base mr-auto">
          {title}
        </h2>
        <div className="dropdown relative ml-auto sm:hidden">
          <a className="dropdown-toggle w-5 h-5 block" href="#?">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </a>
          <div className="dropdown-box mt-5 absolute w-40 top-0 right-0 z-10">
            <div className="dropdown-box__content box p-2">
              <a
                href="#?"
                className="block p-2 transition duration-300 ease-in-out bg-white hover:bg-gray-200 rounded-md"
              >
                All Files
              </a>
            </div>
          </div>
        </div>
        {headerContent}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

TabContentBlock.propTypes = {
  title: PropTypes.string.isRequired,
  headerContent: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  large: PropTypes.bool,
};
TabContentBlock.defaultProps = {
  headerContent: null,
  large: false,
};

export default TabContentBlock;
