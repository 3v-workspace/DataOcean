import React from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useTranslation } from 'react-i18next';

const RelatedPersonBlock = (props) => {
  const { data, personId, matchProps } = props;
  const { i18n } = useTranslation();

  const sortedData = [...data].sort((cur, prev) => {
    const category = {
      family: 1,
      business: 2,
      personal: 3,
    };
    cur.weight = category[cur.relationship_category] ? category[cur.relationship_category] : 4;
    prev.weight = category[prev.relationship_category] ? category[prev.relationship_category] : 4;
    if (cur.weight > prev.weight) {
      return 1;
    }
    if (cur.weight < prev.weight) {
      return -1;
    }
    return 0;
  });

  return (
    <ul className="list-outside">
      {sortedData.map((person, i) => (
        <li key={i}>
          <span className="mr-1">
            {person.relationship_category_display}&emsp;—&emsp;
          </span>
          <a
            className="capitalize cursor-pointer blue"
            href={matchProps.url.replace(personId, person.person_id)}
          >
            {i18n.language === 'en' ? person.full_name : `${person.last_name} ${person.first_name} ${person.middle_name}`}
          </a>
        </li>
      ))}
    </ul>
  );
};

RelatedPersonBlock.propTypes = {
  matchProps: ReactRouterPropTypes.match.isRequired,
  data: PropTypes.array.isRequired,
  personId: PropTypes.number.isRequired,
};

export default RelatedPersonBlock;
