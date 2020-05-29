import React from 'react';
import ReactRouterPropTypes from 'utils/react-router-prop-types';
import PropTypes from 'prop-types';
import { Search, Eye } from 'react-feather';
import Button from 'components/form-components/Button';
import TextInput from 'components/form-components/TextInput';

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
      <td className="w-1/5 align-middle text-center">
        <Button
          className="w-full flex items-center lg:justify-around md:justify-center sm:justify-center"
          variant="secondary"
        >
          <span className="md:hidden sm:hidden lg:inline-block">Переглянути</span>
          <span><Eye /></span>
        </Button>
      </td>
    </tr>
  );
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
      <div
        className="
          flex items-center justify-between intro-y
          col-span-12 flex-wrap sm:flex-no-wrap mt-2 mb-4"
      >
        <div className="text-gray-600">
          Показано: з 1 по 10 з 150 елементів
        </div>
        <TextInput
          placeholder=" Пошук..."
        />
        <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 flex items-center">
          <Search />
        </i>
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
