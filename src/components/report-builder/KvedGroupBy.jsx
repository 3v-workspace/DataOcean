import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'components/form-components';

const KvedGroupBy = (props) => {
  const { onGroupByChange } = props;
  const [kveds, setKveds] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (kveds) {
      const prepared_kveds = kveds.split(',').map((k) => k.trim());
      let errors = 0;
      prepared_kveds.forEach((kved) => {
        if (!/^\d\d\.\d\d$/.test(kved)) {
          errors += 1;
        }
      });
      if (errors > 0) {
        setError('Заповніть бажані КВЕДи через кому');
        return;
      }
      setError('');
      onGroupByChange({ kveds: prepared_kveds });
    }
  }, [kveds]);

  return (
    <TextInput
      required
      name="kveds"
      placeholder="25.02, 03.12, 10.58"
      pattern="^(\d\d\.\d\d\s*,?\s*)+$"
      onChange={(e) => setKveds(e.target.value)}
      value={kveds}
      error={error}
    />
  );
};

KvedGroupBy.propTypes = {
  onGroupByChange: PropTypes.func.isRequired,
};

export default KvedGroupBy;
