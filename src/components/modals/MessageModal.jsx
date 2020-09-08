import React from 'react';
import { XCircle, CheckCircle } from 'react-feather';
import PropTypes from 'prop-types';
import BlankModal from './BlankModal';

const types = {
  warning: {
    colorClass: 'text-theme-12',
    icon: XCircle,
  },
  error: {
    colorClass: 'text-theme-6',
    icon: XCircle,
  },
  success: {
    colorClass: 'text-theme-9',
    icon: CheckCircle,
  },
};

const MessageModal = React.forwardRef((props, ref) => {
  const {
    header, message, id, className, type, onHide, closeButton,
  } = props;

  const { colorClass, icon: Icon } = types[type];

  return (
    <BlankModal
      ref={ref}
      id={id}
      className={className}
      onHide={onHide}
      closeButton={closeButton}
      // size="sm"
      // footerContent={(
      //   <div className="p-5 text-center border-t border-gray-200">
      //     <a href="" className="text-theme-1">
      //       Why do I have this issue?
      //     </a>
      //   </div>
      // )}
    >
      <div className="p-5 text-center">
        <Icon className={`w-16 h-16 mx-auto mt-3 ${colorClass}`} />
        <div className="text-3xl mt-5">{header}</div>
        <div className="text-gray-600 mt-2">{message}</div>
      </div>
      <div className="px-5 pb-8 text-center">
        <button
          type="button"
          data-dismiss="modal"
          className="button w-24 bg-theme-1 text-white"
        >
          Ok
        </button>
      </div>
    </BlankModal>
  );
});

MessageModal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error', 'success']),
  onHide: PropTypes.func,
  closeButton: PropTypes.bool,
};
MessageModal.defaultProps = {
  id: undefined,
  className: '',
  type: 'warning',
  onHide: undefined,
  closeButton: false,
};

export default MessageModal;
