import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBox, DateInput } from 'components/form-components';
import moment from 'moment';

const FilterField = (props) => {
  const {
    filter: { name, type, placeholder }, onChange, defaultValue,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  switch (type) {
    case 'text':
      return (
        <div>
          <SearchBox
            className="border-gray-300 w-full"
            size="md"
            type="text"
            value={value}
            placeholder={placeholder}
            name={name}
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
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onClear={onClear}
            onSearch={onSearch}
          />
        </div>
      );

    case 'date':
      return (
        <div>
          <DateInput
            className="-mb-3 w-40 text-gray-700"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(n, v) => {
              needSearchRef.current = true;
              onChange(n, v);
            }}
            minDate={moment('2020-08-27')}
            onKeyPress={handleKeyPress}
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
    placeholder: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FilterField;
