import React from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField } from 'utils';

const PepRelatedPerson = (props) => {
  const { data, pepId, matchProps } = props;

  return (
    <ul className="list-outside ml-4">
      {data[0].map((person) => (
        <li key={person.to_person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'to_person_relationship_type')} —
          </span>
          <a
            className="capitalize cursor-pointer text-blue-800"
            href={matchProps.url.replace(pepId, person.to_person.id)}
          >
            {getLocaleField(person.to_person, 'fullname')}
          </a>
        </li>
      ))}
      {data[1].map((person) => (
        <li key={person.from_person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'from_person_relationship_type')} —
          </span>
          <a
            className="capitalize cursor-pointer text-blue-800"
            href={matchProps.url.replace(pepId, person.from_person.id)}
          >
            {getLocaleField(person.from_person, 'fullname')}
          </a>
        </li>
      ))}
    </ul>
  );
};


PepRelatedPerson.propTypes = {
  matchProps: ReactRouterPropTypes.match.isRequired,
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
};

export default PepRelatedPerson;
