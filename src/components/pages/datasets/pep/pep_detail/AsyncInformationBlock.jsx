import React, { useEffect } from 'react';
import Api from 'api';
import PropTypes from 'prop-types';
import InformationBlock from 'components/blocks/InformationBlock';

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
      setOpenBlock={setOpenBlock}
      open={open}
      block={block}
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
