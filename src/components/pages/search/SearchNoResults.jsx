import React from 'react';
import { XCircle } from 'react-feather';
import { Button } from 'components/form-components';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';

const SearchNoResults = ({ queryString }) => (
  <div className="box mt-5 pt-16 pb-20 px-5">
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="text-gray-500">
        <XCircle className="w-40 h-40" />
      </div>
      <div className="text-2xl font-bold text-gray-700">
        <Trans
          i18nKey="personPage.noResults"
          values={{ queryString }}
          components={{ b: <b /> }}
        />
      </div>
      <div><Trans i18nKey="checkDataAndTryAgain" /></div>
      <div>
        <Button
          className="px-8"
          variant="primary"
          link="/system/home/person/"
        >
          <Trans i18nKey="personPage.check" />
        </Button>
      </div>
    </div>
  </div>
);

SearchNoResults.propTypes = {
  queryString: PropTypes.string.isRequired,
};

export default SearchNoResults;
