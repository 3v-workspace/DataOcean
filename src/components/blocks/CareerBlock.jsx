import React from 'react';
import PropTypes from 'prop-types';
import { DataSourceLabel } from 'components/pages/datasets/person/DataSourceLabel';
import { getLocaleField } from 'utils';
import { useTranslation } from 'react-i18next';

const CareerBlock = (props) => {
  const { data, person } = props;
  const { t } = useTranslation();

  return (
    <ul className="list-none">
      {data.map((pos, i) => (
        <li key={i} className="grid grid-cols-10">
          <span className="col-span-2">
            {pos.year ? pos.year : t('lastKnown')}
          </span>
          <span className="col-span-4">
            {getLocaleField(pos, 'position')}
          </span>
          <span className="col-span-4">
            <DataSourceLabel person={person} data={pos} noBrackets />
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
