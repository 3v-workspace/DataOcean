import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import PropTypes from 'prop-types';
import { Search, Eye } from 'react-feather';

const DatasetItem = (props) => {
  const {
    name, description,
  } = props;

  return (
    <tr className="intro-x w-full">
      <td className="w-4/5">
        <h2 className="text-xl font-medium whitespace-no-wrap">
          {name}
        </h2>
        {description}
      </td>
      <td className="w-1/5 align-middle">
        <div className="text-center">
          <button type="button" className="button button--md w-full flex items-center lg:justify-around md:justify-center sm:justify-center mr-1 mb-2 bg-theme-1 text-white">
            <span className="md:hidden sm:hidden lg:inline-block">Переглянути</span><span><Eye /></span>
          </button>
        </div>
      </td>
    </tr>
  );
//   return (
//     <div className="grid grid-cols-10">
//       <div className="col-span-8 border-solid border-2 border-gray400">
//         <h2 className="font-semibold mb-4">
//           dfgdf dfhdfghdfgh dfhdgh dgh dg
//         </h2>
//         <h2>
//           dfgdf dfgdfg dgdfgdf
//         </h2>
//       </div>
//       <div className="col-span-2 flex items-center justify-center">
//         <span>asd</span>
//       </div>
//     </div>
//   );
};

DatasetItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const DatasetsList = () => {
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
      <div className="flex items-center justify-between intro-y col-span-12 flex-wrap sm:flex-no-wrap mt-2 mb-4">
        <div className="text-gray-600">Показано: з 1 по 10 з 150 елементів
        </div>
        <div className="sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div className="w-56 relative text-gray-700">
            <input type="text" className="input w-56 box pr-10 placeholder-theme-13" placeholder=" Пошук..." />
            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 flex items-center">
              <Search />
            </i>
          </div>
        </div>
      </div>
      <table className="table table-report -mt-2 white-space w-full sm:w-full">
        <tbody>
          {datasetArray.map((item) => (
            <DatasetItem
              name={item.name}
              description={item.description}
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
