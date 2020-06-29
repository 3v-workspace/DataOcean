import React from 'react';
import BaseModal from './BaseModal';

const BlankModal = (props) => {
  const { children } = props;

  return (
    <BaseModal
      {...props}
    >
      <div className=" p-10 text-center">
        {children}
      </div>
    </BaseModal>
  );
};

export default BlankModal;
