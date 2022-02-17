import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { checkSource, getSourceUrl } from './utils';

export const DataSourceLabel = (props) => {
  const { person, data, isLink, noBrackets } = props;

  return (
    <>
      {/*&emsp;*/}
      {' '}{!noBrackets && '('}{i18next.t('source')}:{' '}
      {isLink ? (
        <Link
          to={{
            pathname: getSourceUrl(data, person),
            state: { related: true },
          }}
        >
          <span className="blue">{i18next.t(checkSource(data))}</span>
        </Link>
      ) : (
        <span className="blue">{i18next.t(checkSource(data))}</span>
      )}{!noBrackets && ')'}
    </>
  );
};

DataSourceLabel.propTypes = {
  person: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  isLink: PropTypes.bool,
  noBrackets: PropTypes.bool,
};

DataSourceLabel.defaultProps = {
  isLink: true,
  noBrackets: false,
};
