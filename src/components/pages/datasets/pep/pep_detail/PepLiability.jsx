import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';

const PepLiability = (props) => {
  const { data, pepId } = props;
  const { t } = useTranslation();
  const sortedLiabilitydata = data.reduce((total, liability) => {
    const curItem = total.find((item) => item.year === liability.declared_at);
    const owner = liability.owner.id === pepId ? 'sumDeclarant' : 'sumFamily';
    const currency = ['USD', 'UAH', 'EUR'].includes(liability.currency) ? liability.currency : 'other';
    const amount = currency === 'other' ? `${liability.amount} ${liability.currency} ` : Number(liability.amount);
    if (curItem) {
      if (!curItem[owner]) {
        curItem[owner] = {
          [currency]: amount,
        };
      } else if (curItem[owner][currency]) {
        curItem[owner][currency] += amount;
      } else {
        curItem[owner][currency] = amount;
      }
    } else {
      total.push({
        year: liability.declared_at,
        [owner]: {
          [currency]: amount,
        },
      });
    }
    return total;
  }, []);

  const liabilityTable = (owner) => (
    <table className="table text-center">
      <caption className="text-gray-700 font-medium mb-3">{owner === 'sumDeclarant' ? t('declarant') : t('family')}</caption>
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-medium">
          <td>{t('year')}</td>
          <td>UAH</td>
          <td>EUR</td>
          <td>USD</td>
          <td>{t('other')}</td>
        </tr>
      </thead>
      <tbody>
        {sortedLiabilitydata.map((item, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td>{renderDate(item.year.toString())}</td>
            <td>{item[owner] && item[owner].UAH ? item[owner].UAH.toFixed(2) : '---'}</td>
            <td>{item[owner] && item[owner].EUR ? item[owner].EUR.toFixed(2) : '---'}</td>
            <td>{item[owner] && item[owner].USD ? item[owner].USD.toFixed(2) : '---'}</td>
            <td>{item[owner] && item[owner].other ? item[owner].other : '---'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex">
      {liabilityTable('sumDeclarant')}
      {liabilityTable('sumFamily')}
    </div>
  );
};

PepLiability.propTypes = {
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
};

export default PepLiability;
