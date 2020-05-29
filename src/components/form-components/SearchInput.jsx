import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';

const SearchInput = (props) => {
  const {
    value, onChange, name, id, placeholder,
    className, width, size, onBlur, onSubmit,
  } = props;

  const classList = [];
  if (className) {
    classList.push(className);
  }
  if (size) {
    classList.push(`input--${size}`);
  }
  classList.push('input border');
  classList.push('w-full');

  const endId = id || `id_${name}`;

  return (
    <div className={`${width} mb-3 flex items-center justify-left relative inline-block`}>
      <input
        className={classList.join(' ')}
        id={endId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        name={name}
      />
      <i className="cursor-pointer w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 flex items-center">
        <Search />
      </i>
    </div>
  );
};

SearchInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  id: null,
  className: '',
  width: 'w-1/2',
  size: undefined,
  placeholder: 'Пошук',
  value: undefined,
  onChange: undefined,
  onBlur: undefined,
  onSubmit: undefined,
};

export default SearchInput;
