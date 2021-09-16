import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { sortData } from './utils';

const PepMoney = (props) => {
  const { data, type, pepId, ownerField } = props;
  sortData(data, '');
  const { t } = useTranslation();
  const tableLabel = {
    INCOME: { declarant: t('declarantIncome'), family: t('familyIncome') },
    EXPENDITURE: { declarant: t('declarantExpenditure'), family: t('familyExpenditure') },
    GIFT: { declarant: t('declarantTotal'), family: t('familyTotal') },
  };

  const position = `${ownerField}_position`;
  const emloyer = `${ownerField}_employer`;

  const sortedMoney = data.reduce((total, income) => {
    const currentYearIncome = total.find((item) => item.year === income.declared_at);
    const recipient = !income[ownerField] || income[ownerField].id === pepId ? 'declarant' : 'family';
    if (currentYearIncome) {
      currentYearIncome.owner[recipient] += Number(income.amount);
    } else {
      total.push({
        year: income.declared_at,
        position: `${income[position]}, ${income[emloyer]}`,
        owner: {
          declarant: recipient === 'declarant' ? Number(income.amount) : 0,
          family: recipient === 'family' ? Number(income.amount) : 0,
        },
      });
    }
    return total;
  }, []);

  return (
    <table className="table">
      <thead>
        <tr className="bg-gray-200 text-gray-700 font-medium">
          <td className="text-center">{t('year')}</td>
          {!(type === 'GIFT') ? (<td className="text-left">{t('position')}</td>) : null}
          <td className="text-right">{`${tableLabel[type].declarant}, UAH `}</td>
          <td className="text-right">{`${tableLabel[type].family}, UAH`}</td>
        </tr>
      </thead>
      <tbody>
        {sortedMoney.map((info, i) => (
          <tr key={i}>
            <td className="text-center">{info.year}</td>
            {!(type === 'GIFT') ? (<td className="text-left">{info.position}</td>) : null}
            <td className="text-right">{info.owner.declarant ? info.owner.declarant.toFixed(2) : '---'}</td>
            <td className="text-right">{info.owner.family ? info.owner.family.toFixed(2) : '---'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

PepMoney.propTypes = {
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  ownerField: PropTypes.string.isRequired,
};

export default PepMoney;
