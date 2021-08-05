import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import ExportXlsx from 'components/table/ExportXlsx';
import Pagination from 'components/table/Pagination';
import { SearchBox } from 'components/form-components';
import { ChevronDown, ChevronUp } from 'react-feather';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';
import FilterField from 'components/filter-fields/FilterField';

const generateFilterValues = (columns) => {
  const defaultValues = {};
  columns.forEach((col) => {
    if (!col.filter) return;
    if (['text', 'number', 'date'].includes(col.filter.type)) {
      defaultValues[col.filter.name] = '';
    }
  });
  return defaultValues;
};

const Table = (props) => {
  const { t } = useTranslation();
  const { columns, url, fields, axiosConfigs, onRowClick, exportUrl } = props;
  const [search, setSearch] = useState('');

  const defaultFilterValues = generateFilterValues(columns);
  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [params, setParams] = useState({ search });
  if (fields.length) {
    params.fields = fields.join(',');
  }

  const tc = useTableController({ url, params, axiosConfigs });

  const onFilterChange = (name, value) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const passFiltersToParams = () => {
    setParams({ ...params, ...filterValues });
    tc.setPage(1);
  };

  const onSearch = (name, value) => {
    setSearch(value);
    setParams({ ...params, search: value });
    tc.setPage(1);
  };

  const isAnyFilter = columns.some((col) => !!col.filter);

  const resetAllFilters = () => {
    setParams({ ...params, ...defaultFilterValues });
    setFilterValues({ ...filterValues, ...defaultFilterValues });
    tc.setPage(1);
  };

  const handleHeaderClick = (col) => {
    if (!col.noSort) {
      tc.setOrdering(col.prop);
    }
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
        <tr
          className={onRowClick ? 'cursor-pointer hover:bg-gray-200' : undefined}
          key={row.id || i}
          onClick={() => {
            if (onRowClick && window.getSelection().type !== 'Range') {
              onRowClick(row);
            }
          }}
        >
          {columns.map((col) => (
            <td key={col.prop} className="border-b">
              <span className="cursor-text">
                {(col.render ? col.render(row[col.prop], row) : row[col.prop]) || '---'}
              </span>
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
        { exportUrl && (
          <div className="mr-6">
            <ExportXlsx
              exportUrl={exportUrl}
              params={tc.getUrlParams()}
              count={tc.count}
            />
          </div>
        )}
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <SearchBox containerClass="w-56" onSearch={onSearch} />
        </div>
      </div>
      <div className="p-5">
        <Pagination tableController={tc} />
      </div>
      { isAnyFilter && (
        <div className="intro-y flex flex-wrap sm:flex-no-wrap items-center justify-end">
          <div className="text-base font-medium text-gray-700 cursor-pointer" onClick={resetAllFilters}>
            {t('resetAllFilters')}
          </div>
        </div>
      )}
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
                  style={{ width: col.width }}
                  key={col.prop}
                  className="border-b-2 whitespace-no-wrap"
                >
                  <div
                    className={`flex items-center h-8 justify-between ${!col.noSort ? 'cursor-pointer' : ''}`}
                    onClick={() => handleHeaderClick(col)}
                  >
                    {col.header}
                    {!col.noSort && (
                      <div className="px-4">
                        <ChevronUp className={`w-4 h-4 -mb-1 ${tc.getOrderingDirection() === 'desc' && tc.orderProp === col.prop ? '' : 'opacity-50'}`} />
                        <ChevronDown className={`w-4 h-4 -mt-1 ${tc.getOrderingDirection() === 'asc' && tc.orderProp === col.prop ? '' : 'opacity-50'}`} />
                      </div>
                    )}
                  </div>
                  <div>
                    {col.filter && (
                      <FilterField
                        filter={col.filter}
                        value={filterValues[col.filter.name]}
                        defaultValue={defaultFilterValues[col.filter.name]}
                        onChange={onFilterChange}
                        onSearch={passFiltersToParams}
                      />
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
    width: PropTypes.string.isRequired,
    noSort: PropTypes.bool,
    filter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      width: PropTypes.string,
    }),
    render: PropTypes.func,
  })).isRequired,
  url: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
  axiosConfigs: PropTypes.object,
  onRowClick: PropTypes.func,
  exportUrl: PropTypes.string,
};
Table.defaultProps = {
  fields: [],
  axiosConfigs: {},
  onRowClick: undefined,
  exportUrl: undefined,
};

export default Table;
