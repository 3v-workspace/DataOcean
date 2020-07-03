import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

const Modal = (props) => {
  const { id, children, onHide, size, closeButton } = props;

  const closeModal = () => {
    // wait for executing hide animation
    setTimeout(() => {
      onHide();
    }, 200);
  };

  return (
    <div
      className="modal"
      id={id}
      onClick={({ target }) => {
        if (target.classList.contains('modal')) {
          closeModal();
        }
      }}
    >
      <div
        className={`modal__content ${
          size ? `modal__content--${size}` : ''} ${
          closeButton ? 'relative' : ''}`}
      >
        {closeButton && (
          <a
            href="#?"
            className="absolute right-0 top-0 mt-3 mr-3"
            data-dismiss="modal"
            onClick={closeModal}
          >
            <X className="w-8 h-8 text-gray-500" />
          </a>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  closeButton: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
};


Modal.defaultProps = {
  size: undefined,
  closeButton: false,
};

export default Modal;
