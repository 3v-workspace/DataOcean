import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import useIsLogin from 'hooks/loginHooks';
import PropTypes from 'prop-types';

const DatasetItem = (props) => {
  const {
    datasetName, datasetDescription,
  } = props;

  return (
    <tr>
      <h2 className="font-medium whitespace-no-wrap">
        {datasetName}
      </h2>
      {datasetDescription}
    </tr>
  );
};

DatasetItem.propTypes = {
  datasetName: PropTypes.string,
  datasetDescription: PropTypes.string,
};
DatasetItem.defaultProps = {
  datasetName: '',
  datasetDescription: '',
};

const DatasetsList = (/*{ location }*/) => {
  // const isLogin = useIsLogin();
  // if (!isLogin) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/auth/sign-in/',
  //         state: { from: location },
  //       }}
  //     />
  //   );
  // }

  const datasetArray = [
    { name: 'Реєстр адміністративно-територіального устрою',
      description: 'Реєстр адміністративно-територіального устрою, що містить назву області, назву району, назву населеного пункту, актуальну назву вулиць, площ, провулків тощо відповідного...' },
    { name: 'Довідник адміністративно-територіальних одиниць України',
      description: 'Довідник адміністративно-територіальних одиниць України' },
    { name: "Довідник 'Адміністративно-територіальні одиниці України'",
      description: 'Набір даних містить відомості про адміністративно-територіальні одиниці України, у складі наступних реквізитів: Перелік атрибутів адміністративно-територіальної одиниці (АТО);...' },
  ];

  return (
    <div className="content">
      <div className="top-bar" />
      <h2 className="intro-y text-lg font-medium mt-10">
        Перелік наборів даних
      </h2>
      <div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap mt-2">
        <div className="hidden md:block mx-auto text-gray-600">Показано: з 1 по 10 з 150 елементів
        </div>
        <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div className="w-56 relative text-gray-700">
            <input type="text" className="input w-56 box pr-10 placeholder-theme-13" placeholder=" Пошук..." />
            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-feather="search" />
          </div>
        </div>
      </div>
      <table className="table table-report -mt-2 white-space">
        <tbody>
          {datasetArray.map((i) => (
            <DatasetItem
              datasetName={i.name}
              datasetDescription={i.description}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};


DatasetsList.propTypes = {
  ...ReactRouterPropTypes,
};

export default DatasetsList;
