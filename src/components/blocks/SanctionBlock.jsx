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
        <tbody className="rounded-sm border-none" style={{ background: '#FFF4F4', boxShadow: 'inset 0 0 0 1px #B10000', outline: '2px solid rgb(177 0 0)', outlineOffset: '-3px' }}>
          <tr className="h-6">
            <td className="p-0">
              <span className="px-5 float-left font-bold text-white" style={{ background: '#B10000', borderRadius: '2px 0px' }}>{t('activeSanctions')}</span>
            </td>
            <td className="p-0" colSpan="5" />
          </tr>
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
        <tbody>
          {sanctions.inactiveSanction.map((sanction) => (
            sanction.name_of_sanction.map((type, i) => (
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

SanctionBlock.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SanctionBlock;
