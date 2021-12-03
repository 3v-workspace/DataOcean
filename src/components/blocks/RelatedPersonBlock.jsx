import React from 'react';
import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useTranslation } from 'react-i18next';

const RelatedPersonBlock = (props) => {
  const { data, personId, matchProps } = props;
  const { i18n } = useTranslation();

  data.sort((cur, prev) => {
    if (cur.relationship_category > prev.relationship_category) {
      return 1;
    }
    return -1;
  });

  return (
    <ul className="list-outside">
      {data.map((person, i) => (
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
