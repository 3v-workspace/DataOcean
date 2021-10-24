import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';
import { useTranslation } from 'react-i18next';

const PaginationPages = (props) => {
  const { tableController: tc } = props;
  const { i18n } = useTranslation();

  let pageRange = [tc.page - 2, tc.page - 1, tc.page, tc.page + 1, tc.page + 2];
  if (tc.page === 2) {
    pageRange.push(5);
  } else if (tc.page === 1) {
    pageRange.push(4);
    pageRange.push(5);
  }
  if (tc.maxPage - tc.page === 1) {
    pageRange.splice(0, 0, tc.maxPage - 4);
  } else if (tc.maxPage - tc.page === 0) {
    pageRange.splice(0, 0, tc.maxPage - 3);
    pageRange.splice(0, 0, tc.maxPage - 4);
  }
  pageRange = pageRange.filter((p) => p >= 1 && p <= tc.maxPage);

  return (
    <ul className="pagination text-sm">
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
          onClick={tc.prevPage}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </li>
      {pageRange.map((page) => (
        <li key={page}>
          <button
            type="button"
            className={`pagination__link ${page === tc.page ? 'pagination__link--active' : ''}`}
            onClick={() => tc.setPage(page)}
          >
            {page.toLocaleString(i18n.language)}
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          className="pagination__link"
          onClick={tc.nextPage}
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
  );
};

PaginationPages.propTypes = {
  tableController: PropTypes.object.isRequired,
};

export default PaginationPages;
