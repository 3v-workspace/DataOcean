import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tooltip from 'components/Tooltip';
import { Search, X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { debounce } from 'throttle-debounce';
import Api from 'api';
import { getLocaleField, toTitleCase } from 'utils';


const SearchWithAutocomplete = (props) => {
  const {
    width, value, onChange, onClear, name, url, placeholder, onSearch, tableScrollParam,
  } = props;
  const { t } = useTranslation();
  const [domReady, setDomReady] = useState(false);
  const [input, setInput] = useState(value);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([{
    label: '',
    value: '',
  }]);

  const portalContainer = document.getElementById('div_for_dropdown');
  const searchInputRef = useRef();
  const resultDropdownRef = useRef();
  const [offsetParams, setOffsetParams] = useState({
    left: 0, top: 0, height: 0,
  });

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (input !== value) {
      setInput(value);
    }
  }, [value]);

  const fetchData = (newValue) => {
    Api.get(`${url}?${name}=${newValue}`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data.results?.map((result) => ({
          label: toTitleCase(getLocaleField(result, name)),
          value: result.id,
        })));
      });
  };

  const debouncedChange = debounce(1000, false, (e) => {
    if (onSearch) {
      if (e.target.value != null) {
        fetchData(e.target.value);
      }
    }
  });

  const closeDropdown = () => {
    setShowDropdown(false);
    setData([]);
  };

  const onInputChange = (e) => {
    setShowDropdown(true);
    setInput(e.currentTarget.value);
  };

  const onInputClear = () => {
    onClear();
    setInput('');
  };

  const onClick = (e) => {
    setInput(e.currentTarget.innerText);
    closeDropdown();
    onChange(name, e.currentTarget.innerText);
  };

  useEffect(() => {
    setOffsetParams({
      left: searchInputRef.current.offsetLeft +
      document.getElementById('search_input').offsetParent.offsetLeft - tableScrollParam,
      top: searchInputRef.current.offsetTop,
      height: searchInputRef.current.offsetHeight,
    });
    if (!isShowDropdown && input.length > 2 && !onClick) {
      setShowDropdown(true);
    } else if (isShowDropdown && input.length < 2) {
      closeDropdown();
    }
  }, [input]);

  const checkIfClickedOutside = useCallback((e) => {
    if (resultDropdownRef.current && !resultDropdownRef.current.contains(e.target)) {
      closeDropdown();
      onInputClear();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      window.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [checkIfClickedOutside]);


  useEffect(() => {
    closeDropdown();
  }, [tableScrollParam]);

  return (
    <>
      <div id="search_input">
        <input
          id={`id_${name}`}
          type="text"
          name={name}
          ref={searchInputRef}
          className="search__input input text-gray-700 pr-8"
          placeholder={placeholder || `${t('search')}...`}
          autoComplete="off"
          value={input}
          onChange={(e) => {
            onInputChange(e);
            e.persist();
            debouncedChange(e);
          }}
          onKeyPress={(e) => {
            if (onSearch && e.key === 'Enter') {
              onChange(name, e.target.value);
              closeDropdown();
            }
          }}
        />
        {input.length > 0 ? (
          <Tooltip content={t('resetFilter')} position="bottom">
            <X className="w-4 h-4 inline inset-y-0 -ml-6 cursor-pointer text-gray-700" onClick={onInputClear} />
          </Tooltip>
        ) : (
          <Search className="w-4 h-4 inline inset-y-0 -ml-6 text-gray-700" />
        )}
      </div>
      {domReady && isShowDropdown ? ReactDOM.createPortal(
        <div
          ref={resultDropdownRef}
          className={`select-dropdown text-black ${isShowDropdown ? 'show' : ''}`}
          style={{
            width: `${width}px`,
            left: offsetParams.left,
            top: offsetParams.top + offsetParams.height,
          }}
        >
          <div className="select-dropdown__content overflow-y-auto max-h-12 text-gray-700">
            {data.length === 0 ? (
              <div className="flex font-normal py-4">
                {t('noResultsFound')}
              </div>
            ) : data.map((result) => (
              <li
                onClick={onClick}
                key={result.value}
                className="flex border-b-1 last:border-b-0 -mx-4 cursor-pointer hover:bg-gray-200"
              >
                <div className="p-3 font-normal">
                  {result.label}
                </div>
              </li>
            ))}
          </div>
        </div>, portalContainer,
      ) : null}
    </>
  );
};

SearchWithAutocomplete.propTypes = {
  width: PropTypes.string,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  tableScrollParam: PropTypes.number,
};

SearchWithAutocomplete.defaultProps = {
  width: undefined,
  placeholder: undefined,
  value: undefined,
  onClear: undefined,
  onSearch: undefined,
  tableScrollParam: 0,
};

export default SearchWithAutocomplete;
