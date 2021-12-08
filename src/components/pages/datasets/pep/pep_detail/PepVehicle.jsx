import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getLocaleField, renderDate } from 'utils';
import { sortData } from 'components/blocks/utils';

const PepVehicle = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const sortedData = sortData([...data], 'vehicle');

  const filteredVehicleData = sortedData.filter(
    (car) => car.vehicle.declared_at === data[0].vehicle.declared_at,
  );
  filteredVehicleData.forEach((car) => {
    car.owner = [car.pep];
  });
  for (let i = 0; i < filteredVehicleData.length - 1; i += 1) {
    if (
      filteredVehicleData[i].vehicle.id === filteredVehicleData[i + 1].vehicle.id
    ) {
      if (filteredVehicleData[i].pep?.id === filteredVehicleData[i + 1].pep?.id) {
        filteredVehicleData.splice(i + 1, 1);
      } else {
        filteredVehicleData[i].owner.push(filteredVehicleData[i + 1].pep);
        filteredVehicleData.splice(i + 1, 1);
      }
      i -= 1;
    }
  }

  return (
    <>
      <table className="table text-center">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>{t('year')}</th>
            <th>{t('vehicle')}</th>
            <th>{t('ownership')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicleData.map((car) => (
            <tr key={car.vehicle.id} className="border-b border-gray-200">
              <td>{renderDate(car.vehicle.declared_at.toString())}</td>
              <td>{`${car.vehicle.brand} ${car.vehicle.model} ${car.vehicle.year}`}</td>
              <td className="capitalize">
                {car.owner.map((person) => (person ? getLocaleField(person, 'fullname') : '---')).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

PepVehicle.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PepVehicle;
