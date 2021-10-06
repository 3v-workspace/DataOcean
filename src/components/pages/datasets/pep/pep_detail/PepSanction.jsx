import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';

const PepSanction = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const today = new Date().toISOString().slice(0, 10);
  if (data[0].noSanction) {
    return (
      <div className="text-center text-xl">
        {data[0].noSanction}
      </div>
    );
  }
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
        <tbody className="border border-l border-red-400">
          {sanctions.activeSanction.map((sanction) => (
            sanction.types_of_sanctions.map((type, i) => (
              <tr key={i} className={i === 0 ? '' : 'border-t border-gray-400'}>
                <td className="mt-0.5 text-left">{type}</td>
                <td>{`${t('numberDecreeFrom', { numberDecree: sanction.decree })} `}{renderDate(sanction.start_date)}</td>
                <td>{renderDate(sanction.start_date)}</td>
                <td>{renderDate(sanction.end_date)}</td>
                <td>{renderDate(sanction.reasoning_date)}</td>
                <td>{sanction.cancellation_condition}</td>
              </tr>
            ))
          ))}
        </tbody>
        <tbody>
          {sanctions.inactiveSanction.map((sanction) => (
            sanction.types_of_sanctions.map((type, i) => (
              <tr key={i} className="border-l border-r border-l border-b border-gray-400">
                <td className="mt-0.5 text-left">{type}</td>
                <td>{`${t('numberDecreeFrom', { numberDecree: sanction.decree })} `}{renderDate(sanction.start_date)}</td>
                <td>{renderDate(sanction.start_date)}</td>
                <td>{renderDate(sanction.end_date)}</td>
                <td>{renderDate(sanction.reasoning_date)}</td>
                <td>{sanction.cancellation_condition}</td>
              </tr>
            ))
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
