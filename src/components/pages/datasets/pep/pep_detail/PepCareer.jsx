import React from 'react';
import PropTypes from 'prop-types';
import { renderDate } from 'utils/dateTime';
import { upFirstLetter } from 'utils';

const PepCareer = (props) => {
  const { data } = props;

  return (
    <ul className="list-none">
      {data.map((job, i) => (
        <li key={i} className="grid grid-cols-6">
          <span className="col-span-1">
            {job.start_date ? (
              <>
                {renderDate(job.start_date.toString())}
                {' - '}
                {renderDate(job.declared_at.toString())}
              </>
            ) : (
              renderDate(job.declared_at.toString())
            )}
          </span>
          <span className="col-start-2 col-span-4">
            {`${upFirstLetter(job.last_job_title)}, ${upFirstLetter(job.last_employer)}`}
          </span>
        </li>
      ))}
    </ul>
  );
};

PepCareer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PepCareer;
