import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';

const PepSanction = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const today = new Date().toISOString().slice(0, 10);
  data.sort((prev, cur) => {
    if (prev.end_date > cur.end_date) {
      return -1;
    }
    if (prev.end_date > cur.end_date) {
      return 1;
    }
    return 0;
  });

  const sanctions = data.reduce((allSanctions, sanction) => {
    if (sanction.end_date > today) {
      allSanctions.activeSanction.push(sanction);
    } else {
      allSanctions.inactiveSanction.push(sanction);
    }
    return allSanctions;
  }, { activeSanction: [], inactiveSanction: [] });

  return (
    <>
      <table className="table text-center">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>{t('typeOfSanction')}</th>
            <th>{t('presidentialDecree')}</th>
            <th>{t('startDate')}</th>
            <th>{t('endDate')}</th>
            <th>{t('reasoningDate')}</th>
            <th>{t('cancelingConditions')}</th>
          </tr>
        </thead>
        <tbody className="border border-red-400">
          {sanctions.activeSanction.map((sanction, i) => (
            <tr key={i} className={i === sanctions.activeSanction.length - 1 ? '' : 'border-b border-gray-400'}>
              <td className="text-left">
                {sanction.types_of_sanctions.map((type, index) => (
                  <div key={index} className="mt-0.5 border-b b0rder-gray-400">{type}</div>))}
              </td>
              <td>{`${t('numberDecreeFrom', { numberDecree: sanction.decree })} `}{renderDate(sanction.start_date)}</td>
              <td>{renderDate(sanction.start_date)}</td>
              <td>{renderDate(sanction.end_date)}</td>
              <td>{renderDate(sanction.reasoning_date)}</td>
              <td>{sanction.cancellation_condition}</td>
            </tr>
          ))}
        </tbody>
        <tbody className="border border-gray-400">
          {sanctions.inactiveSanction.map((sanction, i) => (
            <tr key={i} className="border-b border-gray-400">
              <td className="text-left">
                {sanction.types_of_sanctions.map((type, index) => (
                  <div key={index} className="mt-0.5 border-b b0rder-gray-400">{type}</div>))}
              </td>
              <td>{`${t('numberDecreeFrom', { numberDecree: sanction.decree })} `}{renderDate(sanction.start_date)}</td>
              <td>{renderDate(sanction.start_date)}</td>
              <td>{renderDate(sanction.end_date)}</td>
              <td>{renderDate(sanction.reasoning_date)}</td>
              <td>{sanction.cancellation_condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

PepSanction.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PepSanction;
