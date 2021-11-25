import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleField } from 'utils';

const RelatedCompaniesBlock = (props) => {
  const { data, relationField, withTranslation } = props;

  data.sort((cur, prev) => {
    if (cur[relationField] > prev[relationField]) {
      return -1;
    }
    return 1;
  });

  return (
    <ul className="list-outside">
      {data.map((company, i) => (
        <li key={i}>
          <span>
            {withTranslation ? getLocaleField(company, relationField) : company[relationField]}
            &emsp;—&emsp;
            {getLocaleField(company.company ? company.company : company, 'name')}
            {company.edrpou || (company.company && company.company.edrpou) ? ` (${company.edrpou || company.company.edrpou})` : null}
          </span>
        </li>
      ))}
    </ul>
  );
};

RelatedCompaniesBlock.propTypes = {
  data: PropTypes.array.isRequired,
  relationField: PropTypes.string,
  withTranslation: PropTypes.bool,
};

RelatedCompaniesBlock.defaultProps = {
  relationField: 'relationship_type',
  withTranslation: true,
};

export default RelatedCompaniesBlock;
