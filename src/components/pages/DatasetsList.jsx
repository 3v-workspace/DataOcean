import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import PropTypes from 'prop-types';
import { Eye } from 'react-feather';
import SearchBox from 'components/form-components/SearchBox';

const DatasetPagination = (props) => {
  const {
    first,
    last,
    total,
  } = props;
  return (
    <div className="text-gray-600">
      Показано: з {first} по {last} з {total} елементів
    </div>
  );
};

DatasetPagination.propTypes = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

const DatasetItem = (props) => {
  const {
    name,
    date,
    id,
  } = props;

  return (
    <tr className="intro-x">
      <td>
        <h2 className="font-medium whitespace-no-wrap">{name}</h2>
      </td>
      <td className="text-center">{date}</td>
      <td className="table-report__action w-56">
        <div className="flex justify-center items-center">
          <a
            className="flex items-center mr-3"
            href="/"
            onClick={
            (event) => {
              event.preventDefault();
              console.log(id);
            }
            }
          >
            <Eye className="text-theme-1 w-4" />
            <span className="ml-2 text-theme-1">Переглянути</span>
          </a>
        </div>
      </td>
    </tr>
  );
};

DatasetItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const DatasetsList = () => {
  const datasetArray = [
    { name: 'Реєстр адміністративно-територіального устрою',
      date: '12/05/2020',
      id: '01' },
    { name: 'Довідник адміністративно-територіальних одиниць України',
      date: '15/05/2020',
      id: '02' },
    { name: "Довідник 'Адміністративно-територіальні одиниці України'",
      date: '17/05/2020',
      id: '03' },
  ];

  return (
    <div className="content">
      <h2 className="intro-y text-lg font-medium mt-10">
        Перелік наборів даних
      </h2>
      <div
        className="
          flex items-center justify-between intro-y
          col-span-12 flex-wrap sm:flex-no-wrap mt-2 mb-4"
      >
        <DatasetPagination first="1" last="3" total="200" />
        <SearchBox />
      </div>
      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table className="table table-report intro-y -mt-2 white-space w-full">
          <thead>
            <tr>
              <th className="whitespace-no-wrap">Набір даних</th>
              <th className="text-center whitespace-no-wrap">Дата оновлення</th>
            </tr>
          </thead>
          <tbody>
            {datasetArray.map((item, number) => (
              <DatasetItem
                name={item.name}
                date={item.date}
                id={item.id}
                key={`datasetItem${number}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


DatasetsList.propTypes = {
  ...ReactRouterPropTypes,
};

export default DatasetsList;
