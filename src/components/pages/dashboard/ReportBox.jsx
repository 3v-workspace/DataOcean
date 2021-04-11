import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from 'components/LoadingIcon';
// import { ChevronDown, ChevronUp } from 'react-feather';


// const dirIcons = {
//   up: <ChevronUp className="w-4 h-4" />,
//   down: <ChevronDown className="w-4 h-4" />,
// };


const ReportBox = (props) => {
  const {
    label, value, icon, onClick,
  } = props;

  // const subTextBgTheme = subTextDirection === 'up' ? '9' : '6';

  return (
    <div
      className="report-box zoom-in"
      onClick={onClick}
    >
      <div className="box p-5">
        <div className="flex">
          {icon}
          {/*<div className="ml-auto">*/}
          {/*<div className={`report-box__indicator bg-theme-${subTextBgTheme} */}
          {/*tooltip cursor-pointer tooltipstered`}>*/}
          {/*    {subText}*/}
          {/*    {dirIcons[subTextDirection]}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="text-3xl font-bold leading-8 mt-6">
          {!value ? <LoadingIcon icon="tail-spin" /> : value}
        </div>
        <div className="text-base text-gray-600 mt-1">
          {label}
        </div>
      </div>
    </div>
  );
};

ReportBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  // subText: PropTypes.string.isRequired,
  // subTextDirection: PropTypes.oneOf(['up', 'down']).isRequired,
};

ReportBox.defaultProps = {
  value: null,
  onClick: undefined,
};

export default ReportBox;
