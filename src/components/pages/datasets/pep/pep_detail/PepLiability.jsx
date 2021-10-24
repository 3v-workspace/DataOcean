import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { otherCurrency } from './utils';

const PepLiability = (props) => {
  const { data, pepId } = props;
  const { t, i18n } = useTranslation();
  const filterData = data.filter((liability) => liability.amount !== null);
  const sortedLiabilitydata = filterData.reduce((total, liability) => {
    const curItem = total.find((item) => item.year === liability.declared_at);
    const owner = liability.owner.id === pepId ? 'sumDeclarant' : 'sumFamily';
    const amount = Number(liability.amount);
    if (curItem) {
      if (!curItem[owner]) {
        curItem[owner] = {
          [liability.currency]: amount,
        };
      } else if (curItem[owner][liability.currency]) {
        curItem[owner][liability.currency] += amount;
      } else {
        curItem[owner][liability.currency] = amount;
      }
    } else {
      total.push({
        year: liability.declared_at,
        [owner]: {
          [liability.currency]: amount,
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
          <tr key={i} className="border-b border-gray-200 whitespace-nowrap">
            <td>{renderDate(item.year.toString())}</td>
            <td>{item[owner]?.UAH?.toLocaleString(i18n.language) || '---'}</td>
            <td>{item[owner]?.EUR?.toLocaleString(i18n.language) || '---'}</td>
            <td>{item[owner]?.USD?.toLocaleString(i18n.language) || '---'}</td>
            <td>{item[owner] ? otherCurrency(item[owner]) : '---'}</td>
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
