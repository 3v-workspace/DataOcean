import React, { useEffect } from 'react';
import Api from 'api';
import PropTypes from 'prop-types';
import InformationBlock from './InformationBlock';

const AsyncInformationBlock = (props) => {
  const { block, setDataForBlock, color } = props;
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
      title={block.title}
      titleIcon={block.titleIcon}
      color={color(block.blockProps.data)}
      ref={block.ref}
    >
      <Component {...block.blockProps} />
    </InformationBlock>
  );
};

AsyncInformationBlock.propTypes = {
  block: PropTypes.object.isRequired,
  setDataForBlock: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
};

export default AsyncInformationBlock;
