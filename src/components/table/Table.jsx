import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import ExportXlsx from 'components/table/ExportXlsx';
import Pagination from 'components/table/Pagination';
import { ReactComponent as ArrowUp } from 'images/ParallelArrowUp.svg';
import { ReactComponent as ArrowDown } from 'images/ParallelArrowDown.svg';
import { ReactComponent as FilterOff } from 'images/filterOffOutline.svg';
import LoadingIcon from 'components/LoadingIcon';
import { useTranslation } from 'react-i18next';
import FilterField from 'components/filter-fields/FilterField';
import { useDispatch, useSelector } from 'react-redux';
import { tableSetFilters, initTable } from 'store/tables/actionCreators';
import Tooltip from 'components/Tooltip';
import SelectColumns from 'components/table/SelectColumns';
import setColumns from 'images/setColumns.svg';
import { HIDE_EXPORT_BUTTON, HIDE_FILTERS, HIDE_SELECT_COLUMNS } from 'const';
import Shadow from 'components/table/Shadow';
import { debounce, throttle } from 'throttle-debounce';

const getDefaultFilterValues = (columns) => {
  const defaultValues = {};
  columns.forEach((col) => {
    if (!col.filter) return;
    if (['text', 'number', 'date', 'datepicker'].includes(col.filter.type)) {
      defaultValues[col.filter.name] = '';
    } else if (col.filter.type === 'select') {
      if (col.filter.multiple) {
        defaultValues[col.filter.name] = [];
      } else {
        defaultValues[col.filter.name] = '';
      }
    }
  });
  return defaultValues;
};


const Table = (props) => {
  const { t } = useTranslation();
  const { columns, url, fields, axiosConfigs, onRowClick, exportUrl, minHeight } = props;
  const dispatch = useDispatch();
  const [scrollParams, setScrollParams] = useState({
    scrollLeft: 0,
    offsetWidth: 0,
    scrollWidth: 0,
  });
  const tableParentRef = useRef();
  const defaultFilters = getDefaultFilterValues(columns);
  let filters = useSelector((store) => store.tables[url]?.filters);
  const setFilters = (newFilter) => dispatch(tableSetFilters(url, newFilter));
  if (!filters) {
    const defaultSelectedColumnsNames = columns
      .filter((col) => col.defaultSelected)
      .map((col) => col.prop);
    dispatch(initTable(url, { defaultFilters, defaultSelectedColumnsNames }));
    filters = defaultFilters;
  }
  const search = useSelector((store) => store.tables[url].search);
  const params = { ...filters, search };
  if (fields.length) {
    params.fields = fields.join(',');
  }
  const tc = useTableController({ url, params, axiosConfigs });
  const selectedColumnsNames = useSelector((store) => store.tables[url].selectedColumns);
  const selectedColumns = columns.filter((col) => selectedColumnsNames.includes(col.prop));
  const onFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const reloadTable = () => {
    tc.setPage(1);
    tc.reload();
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

  const refreshFilters = () => {
    const newFilters = {};
    Object.entries(defaultFilters).forEach(([key, value]) => {
      if (filters[key]) {
        newFilters[key] = filters[key];
      } else {
        newFilters[key] = value;
      }
    });
    return newFilters;
  };

  useEffect(() => {
    dispatch(tableSetFilters(url, refreshFilters()));
  }, [JSON.stringify(defaultFilters)]);

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
          {selectedColumns.map((col) => (
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

  const resetScrollParams = () => {
    setScrollParams({
      scrollLeft: tableParentRef.current.scrollLeft,
      offsetWidth: tableParentRef.current.offsetWidth,
      scrollWidth: tableParentRef.current.scrollWidth,
    });
  };

  const checkScrollParams = debounce(250, true, () => {
    if (scrollParams.scrollLeft !== tableParentRef.current.scrollLeft) {
      resetScrollParams();
    }
  });

  useEffect(() => {
    resetScrollParams();
  }, [selectedColumnsNames]);

  useEffect(() => {
    const handleWindowResize = throttle(250, false, () => {
      if (window.innerWidth > 780) {
        resetScrollParams();
      }
    });
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="box p-5">
      {/*<div className="flex flex-wrap sm:flex-no-wrap items-center justify-end">*/}
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
      {/*</div>*/}
      <div className="relative flex flex-wrap sm:flex-no-wrap items-center justify-end">
        {!HIDE_EXPORT_BUTTON && exportUrl && (
          <div className="mr-6">
            <ExportXlsx
              exportUrl={exportUrl}
              params={tc.getUrlParams()}
              count={tc.count}
            />
          </div>
        )}
        {!HIDE_SELECT_COLUMNS && (
          <div className="dropdown p-2">
            <div>
              <img src={setColumns} alt="set-columns" className="cursor-pointer" />
            </div>
            <SelectColumns
              tableUrl={url}
              columns={columns}
            />
          </div>
        )}
        {!HIDE_FILTERS && (
          <Tooltip content={t('resetAllFilters')} position="bottom" noContainer>
            <div>
              <FilterOff
                className={`cursor-pointer ${
                  JSON.stringify(filters) === JSON.stringify(defaultFilters) ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={resetAllFilters}
              />
            </div>
          </Tooltip>
        )}
      </div>
      <Shadow scrollParams={scrollParams} />
      <div
        className="overflow-x-auto box"
        style={{ minHeight: `${minHeight}`, maxHeight: 'calc(100vh - 250px)' }}
        ref={tableParentRef}
        onScroll={checkScrollParams}
      >
        {tc.isLoading && (
          <div className="w-full h-full bg-gray-700 bg-opacity-25 absolute flex items-center justify-center">
            <LoadingIcon icon="three-dots" className="w-16 h-16" />
          </div>
        )}
        <table className="table">
          <thead className="text-white" style={{ backgroundColor: '#436986' }}>
            <tr>
              {selectedColumns.map((col) => (
                <th
                  style={{ width: col.width }}
                  key={col.prop}
                  className="border-b-2 whitespace-no-wrap"
                >
                  <div
                    className={`flex items-center h-8 ${!col.noSort ? 'cursor-pointer' : ''}`}
                    onClick={() => handleHeaderClick(col)}
                  >
                    {col.header}
                    {!col.noSort && (
                      <div className="px-4 flex justify-center items-center">
                        {renderSortArrow(col)}
                      </div>
                    )}
                  </div>
                  <div>
                    {!HIDE_FILTERS && col.filter && (
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
      <div className="px-5 mt-5">
        <Pagination tableController={tc} />
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    defaultSelected: PropTypes.bool,
    width: PropTypes.string,
    noSort: PropTypes.bool,
    filter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    render: PropTypes.func,
  })).isRequired,
  url: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
  axiosConfigs: PropTypes.object,
  onRowClick: PropTypes.func,
  exportUrl: PropTypes.string,
  minHeight: PropTypes.string,
};
Table.defaultProps = {
  fields: [],
  axiosConfigs: {},
  onRowClick: undefined,
  exportUrl: undefined,
  minHeight: undefined,
};

export default Table;
