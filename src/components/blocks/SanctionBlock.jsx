import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/form-components/Button';
import { useTranslation, Trans } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { isEqualArray } from 'utils/index';
import { sortSanctionData } from './utils';

const SanctionBlock = (props) => {
  const ALL = 'all';
  const ACTIVE = 'active';
  const EXPIRED = 'expired';
  const { data } = props;
  const { t } = useTranslation();
  const [values, setValues] = useState([ALL]);
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
      <div className="h-8">
        <Button
          className="border border-gray-400 mr-3 text-xs"
          size="sm"
          variant={`${isEqualArray(values, [ALL]) ? 'selected' : 'secondary'}`}
          isRounded
          onClick={() => setValues([ALL])}
        >
          {t('allSanctions')}
        </Button>
        <Button
          className="border border-gray-400 mr-3 text-xs"
          size="sm"
          variant={`${isEqualArray(values, [ACTIVE]) ? 'selected' : 'secondary'}`}
          isRounded
          disabled={!sanctions.activeSanction.length}
          onClick={() => setValues([ACTIVE])}
        >
          {t('current')}
        </Button>
        <Button
          className="border border-gray-400 text-xs"
          size="sm"
          isRounded
          variant={`${isEqualArray(values, [EXPIRED]) ? 'selected' : 'secondary'}`}
          disabled={!sanctions.inactiveSanction.length}
          onClick={() => setValues([EXPIRED])}
        >
          {t(EXPIRED)}
        </Button>
      </div>
      <tr className="py-6 float-left font-bold">
        <Trans
          i18nKey="sanctionsCounter"
          values={{ count: sanctions.activeSanction.length + sanctions.inactiveSanction.length,
            active: sanctions.activeSanction.length,
            expired: sanctions.inactiveSanction.length,
          }}
        />
      </tr>
      <table className="table text-left">
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
        {(isEqualArray(values, [ALL]) || isEqualArray(values, [ACTIVE])) &&
        !!sanctions.activeSanction.length && (
          <>
            <tr className="pl-5 py-1.5 float-left font-bold">
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
          </>
        )}
        {(isEqualArray(values, [ALL]) || isEqualArray(values, [EXPIRED])) &&
        !!sanctions.inactiveSanction.length && (
          <>
            <tr className="pl-5 py-1.5 float-left font-bold">
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
          </>
        )}
      </table>
    </>
  );
};

SanctionBlock.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SanctionBlock;
