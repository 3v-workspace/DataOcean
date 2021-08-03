import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/Tooltip';

const SearchBox = (props) => {
  const {
    value, onChange, onClear, name, id, placeholder, containerClass,
    className, size, onBlur, onSearch, isRounded,
  } = props;
  const { t } = useTranslation();
  const [mouseOver, setMouseOver] = useState(false);

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
    <div
      className={`${containerClass} relative text-gray-700`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <input
        className={classList.join(' ')}
        id={endId}
        type="text"
        placeholder={placeholder || `${t('search')}...`}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (onSearch && e.key === 'Enter') {
            onSearch(name, e.target.value);
          }
        }}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e);
          } else if (!mouseOver) {
            onSearch(name, e.target.value);
          }
        }}
        name={name}
      />
      {value !== undefined && value.length > 0 ? (
        <Tooltip content={t('resetFilter')} position="bottom">
          <X className="w-4 h-4 inline inset-y-0 -ml-6 cursor-pointer" onClick={onClear} />
        </Tooltip>
      ) : (
        <Search className="w-4 h-4 inline inset-y-0 -ml-6" />
      )}
    </div>
  );
};

SearchBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
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
  placeholder: undefined,
  value: undefined,
  onChange: undefined,
  onClear: undefined,
  onBlur: undefined,
  onSearch: undefined,
  isRounded: false,
};

export default SearchBox;
