import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';
import { useTranslation } from 'react-i18next';

const Pagination = (props) => {
  const { t } = useTranslation();
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

  const pageRange = [];
  if (tc.page > 1) {
    pageRange.push(tc.page - 1);
  }
  pageRange.push(tc.page);
  if (tc.page < tc.maxPage) {
    pageRange.push(tc.page + 1);
  }
  if (pageRange.length === 2 && tc.maxPage >= 3) {
    if (tc.page === 1) {
      pageRange.push(3);
    }
    if (tc.page === tc.maxPage) {
      pageRange.splice(0, 0, tc.maxPage - 2);
    }
  }

  const handleChangePageSize = (e) => {
    tc.setPageSize(+e.target.value);
    tc.setPage(1);
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
        {pageRange[0] > 1 && (
          <li>
            <div className="pagination__link">...</div>
          </li>
        )}
        {pageRange.map((page) => (
          <li key={page}>
            <button
              type="button"
              className={`pagination__link ${page === tc.page ? 'pagination__link--active' : ''}`}
              onClick={() => tc.setPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {pageRange[pageRange.length - 1] < tc.maxPage && (
          <li>
            <div className="pagination__link">...</div>
          </li>
        )}
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
            first: tc.itemsIndexes.first,
            last: tc.itemsIndexes.last,
            count: tc.count,
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
