import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BooleanInput from 'components/form-components/BooleanInput';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { setSelectedColumns } from 'store/tables/actionCreators';
import Button from 'components/form-components/Button';
import { isEqualArray } from 'utils/index';
import Tooltip from 'components/Tooltip';

const SelectColumns = (props) => {
  const { tableUrl, columns } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedColumnsNames = useSelector((store) => store.tables[tableUrl].selectedColumns);
  const [values, setValues] = useState([...selectedColumnsNames]);
  const lessThenMinimumColumns = values.length < 3;


  const handleTurnAllChange = (e) => {
    if (e.target.checked) {
      setValues(columns.map((col) => col.prop));
    } else {
      setValues([...selectedColumnsNames]);
    }
  };

  const handleCheckBoxChange = (e) => {
    const newValues = [...values];
    const columnName = e.target.name;
    const columnIndex = newValues.indexOf(columnName);
    if (e.target.checked) {
      if (columnIndex === -1) {
        newValues.push(e.target.name);
      }
    } else {
      const present = columnIndex !== -1;
      if (present) {
        newValues.splice(columnIndex, 1);
      }
    }
    setValues(newValues);
  };

  // const handleAllSelectedChange = (e) => {
  //   if (e.target.checked) {
  //     dispatch(setSelectedColumns(tableUrl, columns.map((col) => col.prop)));
  //   } else {
  //     dispatch(setSelectedColumns(
  //       tableUrl,
  //       columns.filter((col) => col.defaultSelected).map((col) => col.prop),
  //     ));
  //   }
  // };
  //
  // const handleSelectedChange = (e) => {
  //   const columnName = e.target.name;
  //   const columnIndex = selectedColumnsNames.indexOf(columnName);
  //
  //   if (e.target.checked) {
  //     if (columnIndex === -1) {
  //       dispatch(setSelectedColumns(tableUrl, [...selectedColumnsNames, columnName]));
  //     }
  //   } else {
  //     const minimumColumns = 3;
  //     if (selectedColumnsNames.length > minimumColumns) {
  //       if (columnIndex !== -1) {
  //         dispatch(setSelectedColumns(
  //           tableUrl,
  //           selectedColumnsNames.filter((name) => name !== columnName),
  //         ));
  //       }
  //     }
  //   }
  // };

  return (
    <div className="dropdown-box mt-8 absolute top-0 left-0 sm:left-auto sm:right-0 z-20 -ml-10 sm:ml-0">
      <div className="dropdown-box__content box border">
        <div className="border-b-1 p-3 pl-5 pb-2">
          <BooleanInput
            name="all"
            label={t('turnOnAll')}
            value={columns.length === values.length}
            onChange={handleTurnAllChange}
            // onChange={handleAllSelectedChange}
          />
        </div>
        <div className="overflow-auto h-52">
          {columns.map((col) => (
            <BooleanInput
              className="ml-5 m-2"
              key={col.prop}
              name={col.prop}
              label={col.header}
              value={values.includes(col.prop)}
              onChange={handleCheckBoxChange}
              // onChange={handleSelectedChange}
            />
          ))}
        </div>
        <div className="items-center mt-2 border-t-1 pl-5 pt-3 p-2">
          <Button
            className="w-24 h-8 mr-2 mb-2 cursor-pointer"
            variant="cancel"
            onClick={() => setValues([...selectedColumnsNames])}
            disabled={isEqualArray(values, selectedColumnsNames)}
          >{t('cancel')}
          </Button>
          {lessThenMinimumColumns ? (
            <Tooltip
              className="text-gray-500"
              content={t('tableMinimumColumns')}
              position="top"
            >
              <Button
                className="w-32 h-8 mr-2 mb-2 bg-blue-700 cursor-pointer"
                disabled={lessThenMinimumColumns}
              >
                {t('apply')}
              </Button>
            </Tooltip>
          ) : (
            <Button
              className="w-32 h-8 mr-2 mb-2 bg-blue-700 cursor-pointer"
              onClick={() => dispatch(setSelectedColumns(tableUrl, values))}
              disabled={false}
            >
              {t('apply')}
            </Button>
          )}
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
    width: PropTypes.string,
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
