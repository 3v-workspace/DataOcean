import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BooleanInput from 'components/form-components/BooleanInput';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { setSelectedColumns } from 'store/tables/actionCreators';

const SelectColumns = (props) => {
  const { tableUrl, columns } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedColumnsNames = useSelector((store) => store.tables[tableUrl].selectedColumns);
  const handleAllSelectedChange = (e) => {
    if (e.target.checked) {
      dispatch(setSelectedColumns(tableUrl, columns.map((col) => col.prop)));
    } else {
      dispatch(setSelectedColumns(
        tableUrl,
        columns.filter((col) => col.defaultSelected).map((col) => col.prop),
      ));
    }
  };

  const handleSelectedChange = (e) => {
    const columnName = e.target.name;
    const columnIndex = selectedColumnsNames.indexOf(columnName);

    if (e.target.checked) {
      if (columnIndex === -1) {
        dispatch(setSelectedColumns(tableUrl, [...selectedColumnsNames, columnName]));
      }
    } else {
      const minimumColumns = 3;
      if (selectedColumnsNames.length > minimumColumns) {
        if (columnIndex !== -1) {
          dispatch(setSelectedColumns(
            tableUrl,
            selectedColumnsNames.filter((name) => name !== columnName),
          ));
        }
      }
    }
  };

  return (
    <div className="dropdown-box mt-8 absolute top-0 left-0 sm:left-auto sm:right-0 z-20 -ml-10 sm:ml-0">
      <div className="dropdown-box__content box p-2 pt-3 pl-3 border">
        <div>
          <BooleanInput
            className="border-b-1 pb-1"
            name="all"
            label={t('Display all')}
            value={columns.length === selectedColumnsNames.length}
            onChange={handleAllSelectedChange}
          />
          {columns.map((col) => (
            <BooleanInput
              key={col.prop}
              name={col.prop}
              label={col.header}
              value={selectedColumnsNames.includes(col.prop)}
              onChange={handleSelectedChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

SelectColumns.propTypes = {
  tableUrl: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    defaultSelected: PropTypes.bool,
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
};

export default SelectColumns;
