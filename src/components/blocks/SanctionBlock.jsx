import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { sortSanctionData } from './utils';

const SanctionBlock = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  if (data[0].noSanction) {
    return (
      <div className="text-center text-xl">
        {data[0].noSanction}
      </div>
    );
  }

  const sanctions = sortSanctionData(data);

  return (
    <>
      <tr className="py-3 float-left">
        {t('sanctionsCounter')} {`${sanctions.activeSanction.length + sanctions.inactiveSanction.length}` }
      </tr>
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
        <tr className="px-5 py-3 float-left font-bold">
          {t('activeSanctions')}
        </tr>
        <tbody className="rounded-sm border-none" style={{ background: '#FFF4F4' }}>
          {sanctions.activeSanction.map((sanction) => (
            sanction.name_of_sanction.map((type, i) => (
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
        <tr className="py-3 float-left">
          {t('expiredSanctions')}
        </tr>
        <tbody>
          {sanctions.inactiveSanction.map((sanction) => (
            sanction.name_of_sanction.map((type, i) => (
              <tr key={i} className="border-t border-r border-b border-gray-400">
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

SanctionBlock.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SanctionBlock;
