import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import ExportXlsx from 'components/table/ExportXlsx';
import Pagination from 'components/table/Pagination';
import { SearchBox } from 'components/form-components';
import { ReactComponent as ArrowUp } from 'images/ParallelArrowUp.svg';
import { ReactComponent as ArrowDown } from 'images/ParallelArrowDown.svg';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';
import FilterField from 'components/filter-fields/FilterField';
import { useDispatch, useSelector } from 'react-redux';
import { tableSetFilters, initTable, tableSetSearch } from 'store/tables/actionCreators';


// FIXME: temporary variables for hiding functional
const hideExportButton = true;
const hideFilters = true;


const getDefaultFilterValues = (columns) => {
  const defaultValues = {};
  columns.forEach((col) => {
    if (!col.filter) return;
    if (['text', 'number', 'date', 'select'].includes(col.filter.type)) {
      defaultValues[col.filter.name] = '';
    }
  });
  return defaultValues;
};


const Table = (props) => {
  const { t } = useTranslation();
  const { columns, url, fields, axiosConfigs, onRowClick, exportUrl } = props;
  const dispatch = useDispatch();

  const defaultFilters = getDefaultFilterValues(columns);
  let filters = useSelector((state) => state.tables[url]?.filters);
  const setFilters = (newFilter) => dispatch(tableSetFilters(url, newFilter));
  if (!filters) {
    dispatch(initTable(url, defaultFilters));
    filters = defaultFilters;
  }
  const search = useSelector((state) => state.tables[url].search);
  const setSearch = (newSearch) => dispatch(tableSetSearch(url, newSearch));

  const params = { ...filters, search };
  if (fields.length) {
    params.fields = fields.join(',');
  }

  const tc = useTableController({ url, params, axiosConfigs });

  const onFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const reloadTable = () => {
    tc.setPage(1);
    tc.reload();
  };

  const onSearch = (name, value) => {
    setSearch(value);
    reloadTable();
  };

  const resetAllFilters = () => {
    setFilters({ ...defaultFilters });
    reloadTable();
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

  const renderSortArrow = (col) => {
    if (tc.orderProp !== col.prop) {
      return (
        <>
          <ArrowUp className="h-4 opacity-50" />
          <ArrowDown className="h-4 opacity-50" />
        </>
      );
    }
    if (tc.getOrderingDirection() === 'desc') {
      return <ArrowUp className="h-4" />;
    }
    return <ArrowDown className="h-4" />;
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
        {!hideExportButton && exportUrl && (
          <div className="mr-6">
            <ExportXlsx
              exportUrl={exportUrl}
              params={tc.getUrlParams()}
              count={tc.count}
            />
          </div>
        )}
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <SearchBox
            containerClass="w-56"
            defaultValue={search}
            onSearch={onSearch}
          />
        </div>
      </div>
      <div className="p-5">
        <Pagination tableController={tc} />
      </div>
      {!hideFilters && columns.some((col) => !!col.filter) && (
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
                      <div className="px-1 flex justify-center items-center">
                        {renderSortArrow(col)}
                      </div>
                    )}
                  </div>
                  <div>
                    {!hideFilters && col.filter && (
                      <FilterField
                        filter={col.filter}
                        value={filters[col.filter.name]}
                        defaultValue={defaultFilters[col.filter.name]}
                        onChange={onFilterChange}
                        onSearch={reloadTable}
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
