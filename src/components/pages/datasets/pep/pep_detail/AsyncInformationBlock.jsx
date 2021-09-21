import React, { useEffect } from 'react';
import Api from 'api';
import PropTypes from 'prop-types';
import InformationBlock from './InformationBlock';
import { getColor } from './utils';

const AsyncInformationBlock = (props) => {
  const { block, setDataForBlock, setOpenBlock, open } = props;
  const Component = block.component;

  const fetchData = () => {
    Api.get(block.url)
      .then((resp) => {
        setDataForBlock(block.id, resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InformationBlock
      blockId={block.id}
      title={block.title}
      titleIcon={block.titleIcon}
      color={getColor(block.blockProps.data)}
      ref={block.ref}
      setOpenBlock={setOpenBlock}
      open={open}
    >
      <Component {...block.blockProps} />
    </InformationBlock>
  );
};

AsyncInformationBlock.propTypes = {
  block: PropTypes.object.isRequired,
  setDataForBlock: PropTypes.func.isRequired,
  open: PropTypes.object.isRequired,
  setOpenBlock: PropTypes.func.isRequired,
};

export default AsyncInformationBlock;
