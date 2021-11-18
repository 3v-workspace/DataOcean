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
    <div className="intro-y col-span-12 flex flex-wrap lg:flex-row lg:flex-no-wrap items-center justify-center lg:justify-between">
      <PaginationPages tableController={tc} />
      {!infoOff && tc.count > 0 && (
        <div className="order-3 lg:order-2 my-8 lg:my-0 lg:block text-gray-600">
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
          className="order-2 lg:order-3 lg:w-20 input box sm:mt-0 xl:ml-20 lg:ml-10 mt-3"
          style={{ border: '1px solid #B3C0C9' }}
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
