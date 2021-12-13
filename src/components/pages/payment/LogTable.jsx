import React from 'react';
import Table from 'components/table/Table';
import PageBox from 'components/pages/PageBox';
import { useTranslation } from 'react-i18next';
import { renderDateTime } from 'utils';
import TabContent from '../profile/TabContent';
import TabContentBlock from '../profile/TabContentBlock';

const LogTable = () => {
  const { t } = useTranslation();

  const columns = [
    {
      header: t('logDate'),
      prop: 'timestamp',
      width: '14%',
      defaultSelected: true,
      value: '2021-10-14 - 2021-10-15',
      render: (v) => renderDateTime(v),
      filter: {
        name: 'timestamp',
        type: 'daterange',
      },
    },
    {
      header: t('path'),
      prop: 'pathname',
      width: '15%',
      noSort: true,
      defaultSelected: true,
      filter: {
        name: 'pathname',
        type: 'text',
      },
    },
    {
      header: t('ip'),
      prop: 'ip',
      width: '10%',
      noSort: true,
      defaultSelected: true,
      filter: {
        name: 'ip',
        type: 'text',
      },
    },
    {
      header: t('requestSource'),
      prop: 'request_source',
      width: '10%',
      defaultSelected: true,
      render: (v) => ((v === 'DataOcean') ? t('overview') : t('integrity')),
      filter: {
        name: 'request_source',
        type: 'select',
        options: [
          { value: 'Platform', label: t('integrity') },
          { value: 'DataOcean', label: t('overview') },
        ],
      },
    },
    {
      header: t('parameters'),
      prop: 'parameters',
      render: (v) => (
        <div>
          {Object.keys(v).map((key, i) => (
            <p key={i}>
              <span>{key}: </span>
              <span>{v[key]}</span>
            </p>
          ))}
        </div>
      ),
      width: '50%',
      noSort: true,
      defaultSelected: true,
    },
  ];
  return (
    <TabContent>
      <TabContentBlock large noPadding title={t('myLogs')}>
        <div className="overflow-auto md:overflow-hidden">
          <Table
            columns={columns}
            url="payment/api-logs/project/"
            fields={[
              'timestamp',
              'pathname',
              'request_source',
              'ip',
              'parameters',
            ]}
          />
        </div>
      </TabContentBlock>
    </TabContent>
  );
};

LogTable.propTypes = {
};

export default LogTable;
