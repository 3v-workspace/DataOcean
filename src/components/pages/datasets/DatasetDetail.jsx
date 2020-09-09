import React, { useEffect, useState } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import PageBox from 'components/pages/PageBox';
import Api from 'api';
import datasets from 'const/datasets';
import { Database } from 'react-feather';
import { useTranslation } from 'react-i18next';

const DatasetDetail = (props) => {
  const { match, history } = props;
  const { id } = match.params;
  const { t } = useTranslation();

  const [data, setData] = useState({});

  useEffect(() => {
    Api.get(`register/${id}/`)
      .then((resp) => {
        setData(resp.data);
      });
  }, [id]);

  if (!Object.keys(data)) {
    return null;
  }

  const actions = [];
  if (data.list in datasets) {
    actions.push({
      label: t('registryData'),
      icon: Database,
      onClick: () => {
        history.push(`/system/datasets/${id}/${datasets[data.list].urlEnding}`);
      },
    });
  }

  return (
    <PageBox header={t('viewTheRegistry')} actions={actions}>
      <div className="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-10 text-center sm:text-left">
        <div className="font-semibold text-3xl">{data.name}</div>
      </div>
      <div className="pt-5 px-3 sm:px-10 sm:pt-10 lg:pb-10">
        <table className="table">
          <tbody>
            <tr>
              <td className="font-medium">ID:</td>
              <td>{data.id}</td>
            </tr>
            <tr>
              <td className="font-medium">Api address:</td>
              <td><a href={data.api_address}>{data.api_address}</a></td>
            </tr>
            <tr>
              <td className="font-medium">Url address:</td>
              <td><a href={data.url_address}>{data.url_address}</a></td>
            </tr>
            <tr>
              <td className="font-medium">Source register id:</td>
              <td>{data.source_register_id}</td>
            </tr>
            <tr>
              <td className="font-medium">Source name:</td>
              <td>{data.source_name}</td>
            </tr>
            <tr>
              <td className="font-medium">List endpoint:</td>
              <td>{data.list}</td>
            </tr>
            <tr>
              <td className="font-medium">Retrieve endpoint:</td>
              <td>{data.retrieve}</td>
            </tr>
            <tr>
              <td className="font-medium">Your token:</td>
              <td>{window.localStorage.getItem('token')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageBox>
  );
};

DatasetDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default DatasetDetail;
