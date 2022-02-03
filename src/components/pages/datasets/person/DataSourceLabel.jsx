import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { checkSource, getSourceUrl } from './utils';

export const DataSourceLabel = (props) => {
  const { person, data, isLink } = props;

  return (
    <>
      {/*&emsp;*/}
      {' '}{i18next.t('source')}:{' '}
      {isLink ? (
        <Link to={getSourceUrl(data, person)}><span className="blue">{i18next.t(checkSource(data))}</span></Link>
      ) : (
        <span className="blue">{i18next.t(checkSource(data))}</span>
      )}
    </>
  );
};

DataSourceLabel.propTypes = {
  person: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isLink: PropTypes.bool,
};

DataSourceLabel.defaultProps = {
  isLink: true,
};
