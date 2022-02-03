import React from 'react';
import PropTypes from 'prop-types';
import { DataSourceLabel } from 'components/pages/datasets/person/DataSourceLabel';

const CareerBlock = (props) => {
  const { data, person } = props;
  return (
    <ul className="list-none">
      {data.map((pos, i) => (
        <li key={i} className="grid grid-cols-10">
          <span className="col-span-2">
            {pos.year ? pos.year : 'Остання відома'}
          </span>
          <span className="col-span-4">
            {pos.position}
          </span>
          <span className="col-span-4">
            <DataSourceLabel person={person} data={pos} />
          </span>
        </li>
      ))}
    </ul>
  );
};

CareerBlock.propTypes = {
  person: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default CareerBlock;
