import React, { useState } from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import PropTypes from 'prop-types';
import { Eye } from 'react-feather';
import SearchBox from 'components/form-components/SearchBox';
import Api from 'api';

const dataGet = () => {
  Api.post('register/')
    .then((response) => {
      console.log(response.data.results);
    }).catch((response) => {
      console.log('Error http request, status: ', response);
    });
};

const DatasetTopPagination = (props) => {
  const { currentPage, pageSize, totalElems } = props;
  return (
    <div className="text-gray-600">
      Показано: з {(currentPage - 1) * pageSize + 1} по&nbsp;
      {currentPage * pageSize} з {totalElems} елементів
    </div>
  );
};

DatasetTopPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalElems: PropTypes.number.isRequired,
};

const DatasetItem = (props) => {
  const { name, date, id } = props;
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
            onClick={(event) => {
              event.preventDefault();
              console.log(id);
            }}
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
  id: PropTypes.number.isRequired,
};

const DatasetsList = (props) => {
  const { propsCurrentPage, propsPageSize, propsTotalElems } = props;
  const [currentPage, setCurrentPage] = useState(propsCurrentPage);
  const [pageSize, setPageSize] = useState(propsPageSize);
  const [totalElems, setTotalElems] = useState(propsTotalElems);
  const datasetArray = [
    {
      name: 'Реєстр адміністративно-територіального устрою',
      date: '12/05/2020',
      id: 101,
    },
    {
      name: 'Довідник адміністративно-територіальних одиниць України',
      date: '15/05/2020',
      id: 102,
    },
    {
      name: "Довідник 'Адміністративно-територіальні одиниці України'",
      date: '17/05/2020',
      id: 103,
    },
  ];

  return (
    <div className="content">
      <h2 className="intro-y text-lg font-medium mt-10">
        Перелік наборів даних
      </h2>
      <div
        className={
          'flex items-center justify-between intro-y' +
          'col-span-12 flex-wrap sm:flex-no-wrap mt-2 mb-4'
        }
      >
        <DatasetTopPagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalElems={totalElems}
        />
        <SearchBox />
      </div>
      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table className="table table-report intro-y -mt-2 white-space w-full">
          <thead>
            <tr>
              <th className="whitespace-no-wrap">НАБІР ДАНИХ</th>
              <th className="text-center whitespace-no-wrap">ДАТА ОНОВЛЕННЯ</th>
              <th className="text-center whitespace-no-wrap">ДІЇ</th>
            </tr>
          </thead>
          <tbody>
            {datasetArray.map((item) => (
              <DatasetItem
                name={item.name}
                date={item.date}
                id={item.id}
                key={`${item.id}`}
              />
            ))}
          </tbody>
        </table>
      </div>
      <DatasetPagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalElems={totalElems}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

DatasetsList.propTypes = {
  propsCurrentPage: PropTypes.number,
  propsPageSize: PropTypes.number,
  propsTotalElems: PropTypes.number,
};

DatasetsList.defaultProps = {
  propsCurrentPage: 1,
  propsPageSize: 10,
  propsTotalElems: 105,
};

const DatasetPagination = (props) => {
  const { currentPage, pageSize, totalElems, setCurrentPage } = props;
  const maxPage = totalElems % pageSize ?
    Math.floor(totalElems / pageSize) + 1 : totalElems / pageSize;
  let newPage = +currentPage;
  let indexFrom = newPage - 1;
  indexFrom = indexFrom < 1 ? 1 : indexFrom;
  let maxIndex = indexFrom + 2;
  maxIndex = maxIndex > maxPage ? maxPage : maxIndex;

  const pageNumberClick = (event) => {
    event.preventDefault();
    newPage = +event.currentTarget.name;
    console.log(`HTTP request: dataocean.ua/api/datasetslist?first_record=&${(newPage - 1) * pageSize + 1}page_size=${pageSize}`);
    setCurrentPage(newPage);
  };
  const pageClick = (event) => {
    event.preventDefault();
    switch (event.currentTarget.name) {
      default: break;
      case 'home':
        newPage = 1;
        break;
      case 'previous':
        newPage = newPage > 1 ? newPage - 1 : 1;
        break;
      case 'next':
        newPage = newPage < maxPage ? newPage + 1 : maxPage;
        break;
      case 'end': newPage = maxPage;
        break;
    }

    if (newPage !== +currentPage) {
      dataGet();
    }
    setCurrentPage(newPage);
  };
  if (maxPage === 1) return ('');
  const pageButtons = [];
  for (let index = indexFrom; index <= maxIndex; index += 1) {
    const active = index === +currentPage ? ' pagination__link--active' : '';
    pageButtons.push(
      <li>
        <a
          className={`pagination__link ${active}`}
          href="/"
          onClick={pageNumberClick}
          key={index}
          name={index}
        >
          {index}
        </a>
      </li>,
    );
  }
  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center">
      <ul className="pagination">
        <li>
          <a
            className="pagination__link"
            href="/"
            onClick={pageClick}
            name="home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-left w-4 h-4"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
          </a>
        </li>
        <li>
          <a
            className="pagination__link"
            href="/"
            onClick={pageClick}
            name="previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-4 h-4"><polyline points="15 18 9 12 15 6" /></svg>
          </a>
        </li>
        <li>
          <a
            className="pagination__link"
            style={{ cursor: 'default' }}
            href="/"
            onClick={pageClick}
          >
            ...
          </a>
        </li>
        {pageButtons}
        <li>
          <a
            className="pagination__link"
            style={{ cursor: 'default' }}
            href="/"
            onClick={pageClick}
          >
            ...
          </a>
        </li>
        <li>
          <a
            className="pagination__link"
            href="/"
            onClick={pageClick}
            name="next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-4 h-4"><polyline points="9 18 15 12 9 6" /></svg>
          </a>
        </li>
        <li>
          <a
            className="pagination__link"
            href="/"
            onClick={pageClick}
            name="end"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-right w-4 h-4"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
          </a>
        </li>
      </ul>
      <select
        className="w-20 input box mt-3 sm:mt-0 cursor-pointer"
        value={pageSize}
        onChange={(event) => {
          console.log('HTTP request:');
          console.log(`dataocean.ua/api/datasetslist?first_record=&${(currentPage - 1) * pageSize + 1}page_size=${event.target.value}`);
        }}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="35">35</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

DatasetPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalElems: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

DatasetsList.propTypes = {
  ...ReactRouterPropTypes,
};

export default DatasetsList;
