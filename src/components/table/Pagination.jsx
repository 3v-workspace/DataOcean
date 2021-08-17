import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';
import { useTranslation } from 'react-i18next';

const Pagination = (props) => {
  const { t, i18n } = useTranslation();
  const { tableController: tc } = props;

  const prevPage = () => {
    if (tc.page > 1) {
      tc.setPage(tc.page - 1);
    }
  };

  const nextPage = () => {
    if (tc.page < tc.maxPage) {
      tc.setPage(tc.page + 1);
    }
  };

  let pageRange = [tc.page - 2, tc.page - 1, tc.page, tc.page + 1, tc.page + 2];
  if ([1, 2].includes(tc.page)) {
    pageRange.push(tc.page + 3);
  }
  if (tc.page === 1) {
    pageRange.push(tc.page + 4);
  }
  if ([0, 1].includes(tc.maxPage - tc.page)) {
    pageRange.splice(0, 0, tc.maxPage - 4);
  }
  if (tc.maxPage - tc.page === 0) {
    pageRange.splice(0, 0, tc.maxPage - 5);
  }
  pageRange = pageRange.filter((p) => p >= 1 && p <= tc.maxPage);

  const handleChangePageSize = (e) => {
    tc.setPageSize(+e.target.value);
  };

  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center justify-between">
      <ul className="pagination">
        <li>
          <button
            type="button"
            className="pagination__link"
            onClick={() => tc.setPage(1)}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="pagination__link"
            onClick={prevPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </li>
        {/*{pageRange[0] > 1 && (*/}
        {/*  <li>*/}
        {/*    <div className="pagination__link">...</div>*/}
        {/*  </li>*/}
        {/*)}*/}
        {pageRange.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination__link ${page === tc.page ? 'pagination__link--active' : ''}`}
              onClick={() => tc.setPage(page)}
            >
              {page.toLocaleString(`${i18n.language}`)}
            </button>
          </li>
        ))}
        {/*{pageRange[pageRange.length - 1] < tc.maxPage && (*/}
        {/*  <li>*/}
        {/*    <div className="pagination__link">...</div>*/}
        {/*  </li>*/}
        {/*)}*/}
        <li>
          <button
            type="button"
            className="pagination__link"
            onClick={nextPage}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </li>
        <li>
          <button
            type="button"
            className="pagination__link"
            onClick={() => tc.setPage(tc.maxPage)}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
      {tc.count > 0 && (
        <div className="hidden md:block text-gray-600">
          {t('showingToOfEntries', {
            first: tc.itemsIndexes.first.toLocaleString(i18n.language),
            last: tc.itemsIndexes.last.toLocaleString(i18n.language),
            count: tc.count.toLocaleString(i18n.language),
          })}
        </div>
      )}
      <select
        onChange={handleChangePageSize}
        value={tc.pageSize}
        className="w-20 input box sm:mt-0 sm:ml-20 ml-0 mt-3"
      >
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
  );
};

Pagination.propTypes = {
  tableController: PropTypes.object.isRequired,
};

export default Pagination;
