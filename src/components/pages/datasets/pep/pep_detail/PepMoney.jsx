import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { sortData } from 'components/blocks/utils';

const PepMoney = (props) => {
  const { data, type, pepId, ownerField } = props;
  sortData(data, '');
  const { t, i18n } = useTranslation();
  const tableLabel = {
    INCOME: { declarant: t('declarantIncome'), family: t('familyIncome') },
    EXPENDITURE: { declarant: t('declarantExpenses'), family: t('familyExpenses') },
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
          {!(type === 'GIFT') ? (<td className="text-left w-max">{t('position')}</td>) : null}
          <td className="text-right">{`${tableLabel[type].declarant}, UAH `}</td>
          <td className="text-right">{`${tableLabel[type].family}, UAH`}</td>
        </tr>
      </thead>
      <tbody>
        {sortedMoney.map((info, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td className="text-center">{renderDate(info.year.toString())}</td>
            {!(type === 'GIFT') ? (<td className="text-left">{info.position}</td>) : null}
            <td className="text-right">{info.owner.declarant ? info.owner.declarant.toLocaleString(i18n.language) : '---'}</td>
            <td className="text-right">{info.owner.family ? info.owner.family.toLocaleString(i18n.language) : '---'}</td>
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
