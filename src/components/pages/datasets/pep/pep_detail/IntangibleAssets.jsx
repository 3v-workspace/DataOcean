import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';

const IntangibleAssets = (props) => {
  const { data } = props;
  const { t, i18n } = useTranslation();

  return (
    <table className="table">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-medium">
          <td>{t('ownershipDate')}</td>
          <td>{t('assetType')}</td>
          <td>{t('descriptionObjectOwnership')}</td>
          <td>{t('quantity')}</td>
          <td className="text-right">{t('cost')}, UAH</td>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td>{renderDate(item.acquisition_date)}</td>
            <td>{item.cryptocurrency.type_display}</td>
            <td>{item.cryptocurrency.cryptocurrency_type_display}</td>
            <td>{item.cryptocurrency.quantity?.toLocaleString(i18n.language, { maximumFractionDigits: 2 }) || '---'}</td>
            <td className="text-right">
              {item.cryptocurrency.valuation ? Number(item.cryptocurrency.valuation).toLocaleString(i18n.language) : '---'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

IntangibleAssets.propTypes = {
  data: PropTypes.array.isRequired,
};

export default IntangibleAssets;
