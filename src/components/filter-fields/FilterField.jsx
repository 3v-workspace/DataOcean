import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBox, DateInput } from 'components/form-components';
import moment from 'moment';
import SelectInput2 from './SelectInput2';
import DatePicker2 from './DatePicker2';

const FilterField = (props) => {
  const {
    filter: { name, type, multiple, placeholder, width, options },
    onChange, defaultValue, onSearch, value,
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
            className={`border-gray-300 w-${width || 'full'}`}
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
            onClear={onClear}
          />
        </div>
      );

    case 'select':
      return (
        <div>
          <SelectInput2
            name={name}
            multiple={multiple}
            options={options}
            value={value}
            onChange={(n, v) => {
              needSearchRef.current = true;
              onChange(n, v);
            }}
            onClear={onClear}
          />
        </div>
      );

    case 'datepicker':
      return (
        <div>
          <DatePicker2
            name={name}
            multiple={multiple}
            options={options}
            value={value}
            onChange={(n, v) => {
              needSearchRef.current = true;
              onChange(n, v);
            }}
            onClear={onClear}
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
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    width: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ]).isRequired,
};

FilterField.defaultProps = {
  value: undefined,
};

export default FilterField;
