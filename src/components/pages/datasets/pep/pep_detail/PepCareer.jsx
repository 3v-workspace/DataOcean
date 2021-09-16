import React from 'react';
import PropTypes from 'prop-types';
import { sortData } from './utils';

const PepCareer = (props) => {
  const { data } = props;
  sortData(data, '');
  for (let i = 0; i < data.length - 1; i += 1) {
    if (
      data[i].last_employer.trim().toLowerCase() ===
      data[i + 1].last_employer.trim().toLowerCase() &&
      data[i].last_job_title.trim().toLowerCase() ===
      data[i + 1].last_job_title.trim().toLowerCase()
    ) {
      if (
        data[i].declared_at === data[i + 1].declared_at
      ) {
        data.splice(i + 1, 1);
      } else {
        data[i].start_date = data[i + 1].declared_at;
        data.splice(i + 1, 1);
      }
      i -= 1;
    }
  }

  return (
    <ul className="list-none">
      {data.map((job, i) => (
        <li key={i} className="grid grid-cols-6">
          <span className="col-span-1">
            {`${job.start_date ? `${job.start_date} - ` : ''} ${job.declared_at}`}
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
