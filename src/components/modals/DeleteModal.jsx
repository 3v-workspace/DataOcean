import React from 'react';
import { XCircle, CheckCircle } from 'react-feather';
import PropTypes from 'prop-types';
import BlankModal from './BlankModal';


const DeleteModal = React.forwardRef((props, ref) => {
  const {
    header, message, id, className, onDelete, onHide, closeButton,
  } = props;

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
        <XCircle className="w-16 h-16 mx-auto mt-3 text-theme-6" />
        <div className="text-3xl mt-5">{header}</div>
        <div className="text-gray-600 mt-2">{message}</div>
      </div>
      <div className="px-5 pb-8 text-center">
        <button
          type="button"
          data-dismiss="modal"
          className="button w-24 border text-gray-700 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          className="button w-24 bg-theme-6 text-white"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </BlankModal>
  );
});

DeleteModal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.string,
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  closeButton: PropTypes.bool,
};
DeleteModal.defaultProps = {
  id: undefined,
  className: '',
  header: 'Are you sure?',
  onHide: undefined,
  closeButton: false,
};

export default DeleteModal;
