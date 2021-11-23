import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { sortData } from 'components/blocks/utils';

const PepProperty = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  sortData(data, 'property');

  const lastRealEstateData = data.filter(
    (property) => property.property.declared_at === data[0].property.declared_at,
  );

  const totalArea = lastRealEstateData.reduce((total, item) => {
    if (!total.property_id.includes(item.property.id)) {
      if (item.property.type === (1 || 2)) {
        total.house.area += item.property.area;
        total.house.quantity += 1;
      } else if (item.property.type === (3 || 4)) {
        total.apartment.area += item.property.area;
        total.apartment.quantity += 1;
      } else if (item.property.type === 7) {
        total.land.area += item.property.area;
        total.land.quantity += 1;
      } else {
        total.other.area += item.property.area;
        total.other.quantity += 1;
      }
      total.property_id.push(item.property.id);
    }
    return total;
  },
  {
    apartment: { area: 0, quantity: 0 },
    land: { area: 0, quantity: 0 },
    house: { area: 0, quantity: 0 },
    other: { area: 0, quantity: 0 },
    property_id: [],
  });

  return (
    <table className="table text-center">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-medium">
          <td>{t('year')}</td>
          <td>{t('land')}</td>
          <td>{t('house')}</td>
          <td>{t('apartment')}</td>
          <td>{t('otherProperty')}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{renderDate(lastRealEstateData[0].property.declared_at.toString())}</td>
          <td>
            {totalArea.land.quantity ? `${totalArea.land.area.toFixed(2)} ${t('sqm')} (${totalArea.land.quantity})` : '---'}
          </td>
          <td>
            {totalArea.house.quantity ? `${totalArea.house.area.toFixed(2)} ${t('sqm')} (${totalArea.house.quantity})` : '---'}
          </td>
          <td>
            {totalArea.apartment.quantity ? `${totalArea.apartment.area.toFixed(2)} ${t('sqm')} (${totalArea.apartment.quantity})` : '---'}
          </td>
          <td>
            {totalArea.other.quantity ? `${totalArea.other.area.toFixed(2)} ${t('sqm')} (${totalArea.other.quantity})` : '---'}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

PepProperty.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PepProperty;
