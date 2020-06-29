import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

const BaseModal = (props) => {
  const [isOverflow, setOverflow] = useState(false);
  const { id, children, isShow, setShow, size, isCloseButton } = props;

  const backgroundClassList = ['modal'];

  if (isShow) {
    backgroundClassList.push('overflow-y-auto');
    backgroundClassList.push('show-modal');
  }

  if (isOverflow) {
    backgroundClassList.push('show');
  }

  useEffect(() => {
    if (isShow) {
      setOverflow(true);
    }
  }, [isShow]);

  const close = () => {
    setOverflow(false);
    setTimeout(() => {
      setShow(false);
    }, 200);
  };

  return (
    <div
      className={backgroundClassList.join(' ')}
      id={id}
      onClick={({ target }) => {
        if (target.classList.contains('modal')) {
          close();
        }
      }}
    >
      <div className={`modal__content ${size ? `modal__content--${size}` : ''} ${isCloseButton ? 'relative' : ''}`}>
        {isCloseButton && <a href="#?" className="absolute right-0 top-0 mt-3 mr-3" onClick={close}> <X className="w-8 h-8 text-gray-500" /></a>}
        {children}
      </div>
    </div>
  );
};

BaseModal.propTypes = {
  id: PropTypes.string.isRequired,
  isCloseButton: PropTypes.bool,
  isShow: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
};


BaseModal.defaultProps = {
  size: undefined,
  isCloseButton: false,
};

export default BaseModal;
