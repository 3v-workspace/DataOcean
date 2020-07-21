import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTableController } from 'components/table/index';
import Pagination from 'components/table/Pagination';
import { Button, SearchBox } from 'components/form-components';
import { Plus } from 'react-feather';

const Table = (props) => {
  const { columns, url } = props;
  const [search, setSearch] = useState('');
  const tc = useTableController({ url, params: { search } });

  if (!tc.data.length) {
    return null;
  }

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="intro-y flex flex-wrap sm:flex-no-wrap items-center mb-3 p-2">
        {/*<Button*/}
        {/*  className="shadow-md mr-2"*/}
        {/*>*/}
        {/*  Фільтр*/}
        {/*</Button>*/}
        <div className="hidden md:block mx-auto text-gray-600">
          Показано від {tc.itemsIndexes.first} до {tc.itemsIndexes.last} із {tc.count} записів
        </div>
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <SearchBox containerClass="w-56 relative text-gray-700" onSearch={onSearch} />
        </div>
      </div>
      <div className="overflow-x-auto box">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.prop} className="border-b-2 whitespace-no-wrap">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tc.data.map((row, i) => (
              <tr key={row.id || i}>
                {columns.map((col) => (
                  <td key={col.prop} className="border-b">{row[col.prop]}</td>
                ))}
              </tr>
            ))}
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
};

export default Table;
