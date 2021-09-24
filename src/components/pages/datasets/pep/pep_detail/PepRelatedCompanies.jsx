import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleField } from 'utils';

const PepRelatedCompanies = (props) => {
  const { data } = props;

  return (
    <ul className="list-outside ml-4">
      {data.map((company, i) => (
        <li key={i}>
          <span>
            {getLocaleField(company, 'relationship_type')} - {getLocaleField(company.company, 'name')} ({company.company.edrpou})
          </span>
        </li>
      ))}
    </ul>
  );
};

PepRelatedCompanies.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PepRelatedCompanies;
