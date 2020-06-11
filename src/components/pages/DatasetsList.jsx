import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import PropTypes from 'prop-types';
import { Eye } from 'react-feather';
import SearchBox from 'components/form-components/SearchBox';

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

const DatasetsList = () => {
  const datasetArray = [
    {
      name: 'Реєстр адміністративно-територіального устрою',
      date: '12/05/2020',
      id: '01',
    },
    {
      name: 'Довідник адміністративно-територіальних одиниць України',
      date: '15/05/2020',
      id: '02',
    },
    {
      name: "Довідник 'Адміністративно-територіальні одиниці України'",
      date: '17/05/2020',
      id: '03',
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
        <DatasetTopPagination currentPage="1" pageSize="8" totalElems="100" />
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
      <DatasetPagination currentPage="1" pageSize="10" totalElems="101" />
    </div>
  );
};

const DatasetPagination = (props) => {
  const { currentPage, pageSize, totalElems } = props;
  const maxPage = totalElems % pageSize ?
    Math.floor(totalElems / pageSize) + 1 : totalElems / pageSize;
  const pagesVisible = 3;
  let newPage = +currentPage;
  const pageClick = (event) => {
    event.preventDefault();
    switch (event.currentTarget.name) {
      default: break;
      case 'home':
        newPage = 1;
        break;
      case 'previous': newPage = newPage > 1 ? newPage - 1 : 1;
        break;
      case 'next': newPage = newPage < maxPage ? newPage + 1 : maxPage;
        break;
      case 'end': newPage = maxPage;
        break;
    }
    console.log('Page: ', newPage);
    if (newPage !== +currentPage) console.log('HTTP request:');
  };
  if (maxPage === 1) return ('');
  const pageButtons = [];
  const maxIndex = maxPage > pagesVisible ? pagesVisible : maxPage;
  for (let index = 1; index <= maxIndex; index += 1) {
    const active = index === +currentPage ? ' pagination__link--active' : '';
    pageButtons.push(<li> <a className={`pagination__link ${active}`} href="/" onClick={pageClick}>{index}</a> </li>);
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
};

DatasetsList.propTypes = {
  ...ReactRouterPropTypes,
};

export default DatasetsList;
