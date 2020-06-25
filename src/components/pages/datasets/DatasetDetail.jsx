import React, { useEffect, useState } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import PageBox from 'components/pages/PageBox';
import Api from 'api';

const DatasetDetail = (props) => {
  const { match } = props;
  const { id } = match.params;

  const [data, setData] = useState({});

  useEffect(() => {
    Api.get(`register/${id}/`)
      .then((resp) => {
        setData(resp.data);
      });
  }, []);

  return (
    <PageBox header="Перегляд реєстру">
      <div className="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left">
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
          </tbody>
        </table>
      </div>
    </PageBox>
  );
};

DatasetDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default DatasetDetail;
