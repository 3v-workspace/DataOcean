import React, { useState } from 'react';
import { Button } from 'components/form-components';
import BlankModal from 'components/modals/BlankModal';

const ModalExamplesPage = () => {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Modal Component Example
      </h2>
      <Button
        className="shadow-md mr-2"
        onClick={() => setShow(!isShow)}
      >
        Show modal
      </Button>
      <BlankModal
        id="blank-modal-example"
        isShow={isShow}
        setShow={setShow}
        size="sm"
        isCloseButton
      >
        This is totally awesome blank modal!
      </BlankModal>
    </>
  );
};
export default ModalExamplesPage;
