import React from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { getLocaleField } from 'utils';
import { Link } from 'react-router-dom';

const PepRelatedPerson = (props) => {
  const { data, pepId, matchProps } = props;

  return (
    <ul className="list-outside">
      {data[0].family.map((person) => (
        <li key={person.person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'type')} —
          </span>
          <Link
            className="capitalize cursor-pointer blue"
            key={person.person.id}
            to={{
              pathname: matchProps.url.replace(pepId, person.person.id),
              state: { related: true },
            }}
          >
            {getLocaleField(person.person, 'fullname')}
          </Link>
        </li>
      ))}
      {data[0].business.map((person) => (
        <li key={person.person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'type')} —
          </span>
          <Link
            className="capitalize cursor-pointer blue"
            key={person.person.id}
            to={{
              pathname: matchProps.url.replace(pepId, person.person.id),
              state: { related: true },
            }}
          >
            {getLocaleField(person.person, 'fullname')}
          </Link>
        </li>
      ))}
      {data[0].personal.map((person) => (
        <li key={person.person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'type')} —
          </span>
          <Link
            className="capitalize cursor-pointer blue"
            key={person.person.id}
            to={{
              pathname: matchProps.url.replace(pepId, person.person.id),
              state: { related: true },
            }}
          >
            {getLocaleField(person.person, 'fullname')}
          </Link>
        </li>
      ))}
      {data[0].unknown.map((person) => (
        <li key={person.person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'type')} —
          </span>
          <Link
            className="capitalize cursor-pointer blue"
            key={person.person.id}
            to={{
              pathname: matchProps.url.replace(pepId, person.person.id),
              state: { related: true },
            }}
          >
            {getLocaleField(person.person, 'fullname')}
          </Link>
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
