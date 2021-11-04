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

  return (
    <>
      <table className="table text-center rounded-md border-none" style={{ boxShadow: '0 0 0 1px #dedede' }}>
        <thead className="bg-gray-200 text-gray-700 font-medium">
          <tr className="border-b border-gray-400 rounded-md">
            <td rowSpan="2" className="border-r border-gray-400">{t('year')}</td>
            <th colSpan="4" className="border-r border-gray-400">{t('declarant')}</th>
            <th colSpan="4">{t('family')}</th>
          </tr>
          <tr className="border-b border-gray-400">
            <th>UAH</th>
            <th>EUR</th>
            <th>USD</th>
            <th className="border-r border-gray-400">{t('other')}</th>
            <th>UAH</th>
            <th>EUR</th>
            <th>USD</th>
            <th className="border-r border-gray-400">{t('other')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedLiabilitydata.map((item, i) => (
            <tr key={i} className="border-b border-gray-400 whitespace-nowrap rounded-md">
              <td className="border-r border-gray-400">{renderDate(item.year.toString())}</td>
              <td>{item.sumDeclarant?.UAH?.toLocaleString(i18n.language) || '---'}</td>
              <td>{item.sumDeclarant?.EUR?.toLocaleString(i18n.language) || '---'}</td>
              <td>{item.sumDeclarant?.USD?.toLocaleString(i18n.language) || '---'}</td>
              <td className="border-r border-gray-400">{item.sumDeclarant ? otherCurrency(item.sumDeclarant) : '---'}</td>
              <td>{item.sumFamily?.UAH?.toLocaleString(i18n.language) || '---'}</td>
              <td>{item.sumFamily?.EUR?.toLocaleString(i18n.language) || '---'}</td>
              <td>{item.sumFamily?.USD?.toLocaleString(i18n.language) || '---'}</td>
              <td>{item.sumFamily ? otherCurrency(item.sumFamily) : '---'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

PepLiability.propTypes = {
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
};

export default PepLiability;
