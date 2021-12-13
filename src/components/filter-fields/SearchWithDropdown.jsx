import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tooltip from 'components/Tooltip';
import { Search, X } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import Api from 'api';
import { getLocaleField, toTitleCase } from 'utils';


const SearchWithDropdown = (props) => {
  const {
    width, value, onChange, onClear, name, url, placeholder, onSearch, tableScrollParam,
  } = props;
  const { t } = useTranslation();
  const [domReady, setDomReady] = useState(false);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([{
    label: '',
    value: '',
  }]);

  const portalContainer = document.getElementById('div_for_dropdown');
  const searchInputRef = useRef();
  const [offsetParams, setOffsetParams] = useState({
    left: 0, top: 0, height: 0,
  });

  useEffect(() => {
    setDomReady(true);
  }, []);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const fetchData = (newValue) => {
    Api.get(`${url}?${name}=${newValue}`, { useProjectToken: true })
      .then((resp) => {
        setData(resp.data.results?.map((result) => ({
          label: toTitleCase(getLocaleField(result, name)),
          value: result.id,
        })));
      });
  };

  useEffect(() => {
    if (!isShowDropdown && value.length > 2) {
      setShowDropdown(true);
      setOffsetParams({
        left: searchInputRef.current.offsetLeft +
        document.getElementById('search_input').offsetParent.offsetLeft - tableScrollParam,
        top: searchInputRef.current.offsetTop,
        height: searchInputRef.current.offsetHeight,
      });
    } else if (isShowDropdown && value.length < 2) {
      setShowDropdown(false);
    }
  }, [value]);

  useEffect(() => {
    if (!isShowDropdown) {
      setData([]);
    }
  }, [isShowDropdown]);

  useEffect(() => {
    setShowDropdown(false);
  }, [tableScrollParam]);

  const debouncedChange = debounce(1000, false, (e) => {
    if (onSearch) {
      fetchData(e.target.value);
    }
  });

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
          value={value}
          onChange={(e) => {
            onChange(e);
            e.persist();
            debouncedChange(e);
          }}
          onKeyPress={(e) => {
            if (onSearch && e.key === 'Enter') {
              onSearch(name, e.target.value);
              closeDropdown();
            }
          }}
        />
        {value !== undefined && value.length > 0 ? (
          <Tooltip content={t('resetFilter')} position="bottom">
            <X className="w-4 h-4 inline inset-y-0 -ml-6 cursor-pointer text-gray-700" onClick={onClear} />
          </Tooltip>
        ) : (
          <Search className="w-4 h-4 inline inset-y-0 -ml-6 text-gray-700" />
        )}
      </div>
      {domReady && isShowDropdown ? ReactDOM.createPortal(
        <div
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
              <Link
                to={`/system/datasets/${url}${result.value}`}
                key={result.value}
                className="flex border-b-1 last:border-b-0 -mx-4 cursor-pointer hover:bg-gray-200"
              >
                <div className="p-3 font-normal">
                  {result.label}
                </div>
              </Link>
            ))}
          </div>
        </div>, portalContainer,
      ) : null}
    </>
  );
};

SearchWithDropdown.propTypes = {
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

SearchWithDropdown.defaultProps = {
  width: undefined,
  placeholder: undefined,
  value: undefined,
  onClear: undefined,
  onSearch: undefined,
  tableScrollParam: 0,
};

export default SearchWithDropdown;
