import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';

const SearchBox = (props) => {
  const {
    value, onChange, name, id, placeholder, containerClass,
    className, size, onBlur, onSearch, isRounded,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (size) {
    classList.push(`input--${size}`);
  }
  if (isRounded) {
    classList.push('rounded-full');
  }
  classList.push('input pr-8 placeholder-theme-13');

  const endId = id || `id_${name}`;

  return (
    <div className={`${containerClass} relative text-gray-700`}>
      <input
        className={classList.join(' ')}
        id={endId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (onSearch && e.key === 'Enter') {
            onSearch(e);
          }
        }}
        onBlur={onBlur || onSearch}
        name={name}
      />
      <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
    </div>
  );
};

SearchBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  isRounded: PropTypes.bool,
};

SearchBox.defaultProps = {
  className: '',
  containerClass: '',
  id: undefined,
  name: undefined,
  size: undefined,
  placeholder: 'Пошук...',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onSearch: undefined,
  isRounded: false,
};

export default SearchBox;
