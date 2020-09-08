import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'components/form-components';

const KvedGroupBy = (props) => {
  const { onGroupByChange } = props;
  const [kveds, setKveds] = useState('');

  useEffect(() => {
    onGroupByChange({ kveds });
  }, [kveds]);

  return (
    <TextInput
      name="kveds"
      placeholder="25.02, 03.12, 10.58"
      onChange={(e) => setKveds(e.target.value)}
      value={kveds}
    />
  );
};

KvedGroupBy.propTypes = {
  onGroupByChange: PropTypes.func.isRequired,
};

export default KvedGroupBy;
