import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from 'components/form-components';

const FilterField = ({ filter, onChange, onClear, onPressEnter, value }) => {
  switch (filter.type) {
    case 'text':
      return (
        <>
          <div>
            <SearchBox
              className="border-gray-300"
              size="md"
              type="text"
              value={value}
              onChange={(e) => onChange(filter.queryParam, e.target.value)}
              onClear={() => onClear(filter.queryParam)}
              onSearch={onPressEnter}
            />
          </div>
        </>
      );

    case 'number':
      return (
        <>
          <div>
            <SearchBox
              className="border-gray-300 w-20"
              size="md"
              type="number"
              placeholder="12345"
              value={value}
              onChange={(e) => onChange(filter.queryParam, e.target.value)}
              onClear={() => onClear(filter.queryParam)}
              onSearch={onPressEnter}
            />
          </div>
        </>
      );

    case 'data':
      return (
        <>
          <div>
            <SearchBox
              className="border-gray-300 w-32"
              size="md"
              placeholder="1989-02-11"
              value={value}
              onChange={(e) => onChange(filter.queryParam, e.target.value)}
              onClear={() => onClear(filter.queryParam)}
              onSearch={onPressEnter}
            />
          </div>
        </>
      );
    default:
      return null;
  }
};

FilterField.propTypes = {
  filter: PropTypes.shape({
    queryParam: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  value: PropTypes.string,
};

FilterField.defaultProps = {
  value: '',
};

export default FilterField;
