import React from 'react';
import PropTypes from 'prop-types';

// TODO: finish this...
const BlankModal = (props) => {
  const { id, children } = props;

  return (
    <div className="modal" id={id}>
      <div className="modal__content p-10 text-center">
        {children}
      </div>
    </div>
  );
};

BlankModal.propTypes = {
  id: PropTypes.string.isRequired,
};


export default BlankModal;
