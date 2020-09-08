import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/form-components';
import { Plus } from 'react-feather';

const Dropdown = (props) => {
  const {
    align, dropdownComponent, label, children, className,
  } = props;
  const boxRef = useRef();

  const closeBox = () => {
    boxRef.current.classList.remove('show');
  };

  return (
    <div className={`dropdown relative ${className}`}>
      {dropdownComponent || (
        <Button className="dropdown-toggle">
          {label || <Plus className="w-5 h-5" />}
        </Button>
      )}
      <div
        ref={boxRef}
        className={`dropdown-box mt-10 absolute w-40 top-0 ${align}-0 z-20`}
        onClick={closeBox}
      >
        <div className="dropdown-box__content box p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  dropdownComponent: PropTypes.node,
  align: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.node,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  dropdownComponent: undefined,
  align: 'left',
  label: undefined,
  className: '',
};

export default Dropdown;
