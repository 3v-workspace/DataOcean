import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import Pagination from 'components/table/Pagination';
import { SearchBox } from 'components/form-components';
import { ChevronDown, ChevronUp } from 'react-feather';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';


const orderingIcons = {
  asc: <ChevronDown className="w-4 h-4" />,
  desc: <ChevronUp className="w-4 h-4" />,
};


const Table = (props) => {
  const { t } = useTranslation();
  const { columns, url, fields, axiosConfigs } = props;
  const [search, setSearch] = useState('');

  const params = { search };
  if (fields.length) {
    params.fields = fields.join(',');
  }

  const tc = useTableController({ url, params, axiosConfigs });

  const onSearch = (e) => {
    setSearch(e.target.value);
    tc.setPage(1);
  };

  const handleHeaderClick = (col) => {
    tc.setOrdering(col.prop);
  };

  const getTableBody = () => {
    if (tc.error) {
      return (
        <tr>
          <td colSpan={columns.length} className="border-b text-center text-red-500">
            {tc.error}
          </td>
        </tr>
      );
    }
    if (tc.data.length) {
      return tc.data.map((row, i) => (
        <tr key={row.id || i}>
          {columns.map((col) => (
            <td key={col.prop} className="border-b">
              {(col.render ? col.render(row[col.prop]) : row[col.prop]) || '---'}
            </td>
          ))}
        </tr>
      ));
    }
    if (tc.isDataReady) {
      return (
        <tr>
          <td colSpan={columns.length} className="border-b text-center text-gray-700">
            {search ? (
              t('noSearchResults')
            ) : (
              t('noDataAvailable')
            )}
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="intro-y flex flex-wrap sm:flex-no-wrap items-center justify-end mb-3 p-2">
        {/*<Button*/}
        {/*  className="shadow-md mr-2"*/}
        {/*>*/}
        {/*  Фільтр*/}
        {/*</Button>*/}
        {/*<div className="hidden md:block mx-auto text-gray-600">*/}
        {/*  {t('showingToOfEntries', {*/}
        {/*    first: tc.itemsIndexes.first,*/}
        {/*    last: tc.itemsIndexes.last,*/}
        {/*    count: tc.count,*/}
        {/*  })}*/}
        {/*</div>*/}
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <SearchBox containerClass="w-56" onSearch={onSearch} />
        </div>
      </div>
      <div className="p-5">
        <Pagination tableController={tc} />
      </div>
      <div className="overflow-x-auto box">
        {tc.isLoading && (
          <div className="w-full h-full bg-gray-700 bg-opacity-25 absolute flex items-center justify-center">
            <LoadingIcon icon="three-dots" className="w-16 h-16" />
          </div>
        )}
        <table className="table">
          <thead className="text-white" style={{ backgroundColor: '#436986' }}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.prop}
                  className="border-b-2 whitespace-no-wrap cursor-pointer"
                >
                  <div className="flex items-center justify-between" onClick={() => handleHeaderClick(col)}>
                    {col.header}
                    {tc.orderProp === col.prop && (
                      orderingIcons[tc.getOrderingDirection()]
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTableBody()}
          </tbody>
        </table>
      </div>
      <div className="p-5">
        <Pagination tableController={tc} />
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    render: PropTypes.func,
  })).isRequired,
  url: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
  axiosConfigs: PropTypes.object,
};
Table.defaultProps = {
  fields: [],
  axiosConfigs: {},
};

export default Table;
