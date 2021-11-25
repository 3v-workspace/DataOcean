import React from 'react';
import PropTypes from 'prop-types';
import { renderDate } from 'utils/dateTime';
import { upFirstLetter } from 'utils';
import Career from 'components/blocks/Career';
import { sortedCareerData, sortData } from 'components/blocks/utils';
import { SOURCE } from './const';

const PersonCareer = (props) => {
  const { data } = props;
  const pepCareerData = data.filter((item) => item.source === `position_${Object.keys(SOURCE)[0]}`);
  const sanctionCareerData = sortData(data.filter((item) => item.source === `position_${Object.keys(SOURCE)[1]}`), 'year');

  return (
    <>
      {pepCareerData && (<Career data={sortedCareerData(pepCareerData)} />)}
      {sanctionCareerData && (
        <ul className="list-none">
          {sanctionCareerData.map((career, i) => (
            <li key={i} className="grid grid-cols-6">
              <span className="col-span-1">{renderDate(career.year.toString())}</span>
              <span className="col-start-2 col-span-4">{upFirstLetter(career.position)}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

PersonCareer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PersonCareer;
