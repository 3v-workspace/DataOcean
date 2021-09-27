import React from 'react';
import PropTypes from 'prop-types';
import { renderDate } from 'utils/dateTime';
import { sortData } from './utils';

const PepCareer = (props) => {
  const { data } = props;
  sortData(data, '');
  const sortedCareerData = data.reduce((sortdata, career) => {
    const duplicate = sortdata.find((item) => (
      item.last_employer.trim().toLowerCase() === career.last_employer.trim().toLowerCase() &&
      item.last_job_title.trim().toLowerCase() === career.last_job_title.trim().toLowerCase()
    ));

    if (!duplicate || career.declared_at > duplicate.declared_at + 1) {
      sortdata.push(career);
    } else if (career.declared_at !== duplicate.declared_at) {
      duplicate.start_date = career.declared_at;
    }

    return sortdata;
  }, []);

  return (
    <ul className="list-none">
      {sortedCareerData.map((job, i) => (
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
            {`${job.last_job_title}, ${job.last_employer}`}
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
