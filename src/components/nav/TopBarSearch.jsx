import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Database, Search } from 'react-feather';
import Api from 'api';
import { Link } from 'react-router-dom';


const SearchResult = (props) => {
  const { label, subLabel, link } = props;
  return (
    <Link to={link} className="flex items-center mb-2">
      <div
        className="w-8 h-8 flex-grow-0 flex-shrink-0 bg-theme-18 text-theme-9 flex items-center justify-center rounded-full"
      >
        <Database className="feather feather-inbox w-4 h-4" />
      </div>
      <div className="ml-3">{label}</div>
      {subLabel && (
        <div className="ml-auto w-48 truncate text-gray-600 text-xs text-right">
          {subLabel}
        </div>
      )}
    </Link>
  );
};

SearchResult.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  subLabel: PropTypes.string,
};
SearchResult.defaultProps = {
  subLabel: '',
};


const TopBarSearch = (props) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = (search) => {
    Api.get('register/', { params: { search } })
      .then((resp) => {
        setData(resp.data.results);
      })
      .catch(() => {
        setData([]);
      });
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    fetchData(value);
  };

  const handleBlur = () => {
    setShow(false);
  };

  const handleFocus = () => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  };

  return (
    <>
      <div className="search hidden sm:block">
        <input
          type="text"
          className="search__input input placeholder-theme-13"
          placeholder="Пошук наборів даних..."
          onChange={handleSearch}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <Search className="search__icon" />
      </div>
      <a className="notification sm:hidden" href="#?">
        <Search className="notification__icon" />
      </a>
      <div className={`search-result ${show ? 'show' : ''}`}>
        <div className="search-result__content">
          <div className="search-result__content__title">
            Набори даних
          </div>
          <div>
            {data.map((ds) => (
              <SearchResult key={ds.id} label={ds.name} link={`/system/datasets/${ds.id}/`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

TopBarSearch.propTypes = {};

export default TopBarSearch;
