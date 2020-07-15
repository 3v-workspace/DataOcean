import React from 'react';
import {
  Eye, FileText, Plus, Printer,
} from 'react-feather';
import { Button, SearchBox } from 'components/form-components';
import { Pagination, useTableController } from 'components/table';
import moment from 'moment';
import { DATETIME_FORMAT } from 'const/const';
import { Link } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';

const DatasetsList = ({ match }) => {
  const tc = useTableController({
    url: 'register/',
  });

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Набори даних
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap items-center mt-2">
          <Button
            className="shadow-md mr-2"
          >
            Мої набори даних
          </Button>
          <div className="dropdown relative">
            <button type="button" className="dropdown-toggle button px-2 box text-gray-700">
              <span className="w-5 h-5 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </span>
            </button>

          </div>
          <div className="hidden md:block mx-auto text-gray-600">
            Показано від {tc.itemsIndexes.first} до {tc.itemsIndexes.last} із {tc.count} записів
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <SearchBox containerClass="w-56 relative text-gray-700" />
          </div>
        </div>
        {/*BEGIN: Data List*/}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-no-wrap">ID</th>
                <th className="whitespace-no-wrap">Назва набору даних</th>
                <th className="text-center whitespace-no-wrap">Оновлення</th>
                <th className="text-center whitespace-no-wrap">Інструменти</th>
              </tr>
            </thead>
            <tbody>
              {tc.isDataReady && tc.data.map((item) => (
                <tr key={item.id} className="intro-x">
                  <td>
                    {item.id}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td className="text-center">
                    {moment(item.source_last_update).format(DATETIME_FORMAT)}
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <Link to={`${match.url}${item.id}/`} className="flex items-center mr-3 text-theme-1">
                        <Eye className="w-4 h-4 mr-1 mb-1" /> Переглянути
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <Pagination tableController={tc} />
        {/* END: Pagination */}
      </div>
    </>
  );
};

DatasetsList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default DatasetsList;
