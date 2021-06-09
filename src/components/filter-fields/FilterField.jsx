import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'components/form-components';

const FilterField = (props) => {
  const {
    filter: { name, type }, onChange, defaultValue,
    onSearch, value,
  } = props;

  const needSearchRef = React.useRef(false);

  const onClear = () => {
    needSearchRef.current = true;
    onChange(name, defaultValue);
  };

  useEffect(() => {
    if (needSearchRef.current) {
      onSearch();
      needSearchRef.current = false;
    }
  }, [needSearchRef.current]);

  switch (type) {
    case 'text':
      return (
        <div>
          <SearchBox
            className="border-gray-300"
            size="md"
            type="text"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onClear={onClear}
            onSearch={onSearch}
          />
        </div>
      );

    case 'number':
      return (
        <div>
          <SearchBox
            className="border-gray-300 w-20"
            size="md"
            type="number"
            placeholder="12345"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onClear={onClear}
            onSearch={onSearch}
          />
        </div>
      );

    case 'data':
      return (
        <div>
          <SearchBox
            className="border-gray-300 w-32"
            size="md"
            placeholder="1989-02-11"
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onClear={onClear}
            onSearch={onSearch}
          />
        </div>
      );
    default:
      return null;
  }
};

FilterField.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FilterField;
