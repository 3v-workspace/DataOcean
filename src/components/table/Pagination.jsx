import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PaginationPages from 'components/table/PaginationPages';

const Pagination = (props) => {
  const { t, i18n } = useTranslation();
  const { tableController: tc, infoOff, pageSizeOff } = props;

  const handleChangePageSize = (e) => {
    tc.setPageSize(+e.target.value);
  };

  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-no-wrap items-center justify-between">
      <PaginationPages tableController={tc} />
      {!infoOff && tc.count > 0 && (
        <div className="hidden md:block text-gray-600">
          {t('showingToOfEntries', {
            first: tc.itemsIndexes.first.toLocaleString(i18n.language),
            last: tc.itemsIndexes.last.toLocaleString(i18n.language),
            count: tc.count.toLocaleString(i18n.language),
          })}
        </div>
      )}
      {!pageSizeOff && (
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
      )}
    </div>
  );
};

Pagination.propTypes = {
  tableController: PropTypes.object.isRequired,
  infoOff: PropTypes.bool,
  pageSizeOff: PropTypes.bool,
};

Pagination.defaultProps = {
  infoOff: false,
  pageSizeOff: false,
};

export default Pagination;
