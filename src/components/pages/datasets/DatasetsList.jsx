import React from 'react';
import { Eye } from 'react-feather';
// import { Button, SearchBox } from 'components/form-components';
import { Pagination, useTableController } from 'components/table';
import { Link } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useTranslation } from 'react-i18next';
// import Tooltip from 'components/Tooltip';
import { dateFormat } from 'utils';
import datasets from './datasets';


const DatasetsList = ({ match, history }) => {
  // const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();

  const tc = useTableController({
    url: 'register/',
    // params: { search },
  });

  // const onSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  return (
    <>
      {/*<h2 className="intro-y text-lg font-medium mt-10">*/}
      {/*  {t('datasets')}*/}
      {/*</h2>*/}
      <div className="grid grid-cols-12 gap-6 mt-5">
        {/*<div className="intro-y col-span-12 flex flex-wrap sm:flex-no-wrap items-center mt-2">*/}
        {/*<Tooltip content={`${t('inDevelopment')}...`}>*/}
        {/*  <Button*/}
        {/*    className="shadow-md mr-2 disabled"*/}
        {/*  >*/}
        {/*    {t('myDatasets')}*/}
        {/*  </Button>*/}
        {/*</Tooltip>*/}
        {/*<div className="dropdown relative">*/}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="dropdown-toggle button px-2 box text-gray-700 disabled"*/}
        {/*  >*/}
        {/*    <span className="w-5 h-5 flex items-center justify-center">*/}
        {/*      <Plus className="w-4 h-4" />*/}
        {/*    </span>*/}
        {/*  </button>*/}
        {/*</div>*/}
        {/*<div className="hidden md:block ml-auto text-gray-600">*/}
        {/*  {t('showingToOfEntries', {*/}
        {/*    first: tc.itemsIndexes.first,*/}
        {/*    last: tc.itemsIndexes.last,*/}
        {/*    count: tc.count,*/}
        {/*  })}*/}
        {/*</div>*/}
        {/*<div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">*/}
        {/*  <SearchBox containerClass="w-56 relative text-gray-700" onSearch={onSearch} />*/}
        {/*</div>*/}
        {/*</div>*/}
        <Pagination tableController={tc} />
        {/*BEGIN: Data List*/}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead className="text-white" style={{ backgroundColor: '#436986' }}>
              <tr>
                <th className="whitespace-no-wrap">ID</th>
                <th className="whitespace-no-wrap">{t('datasetName')}</th>
                <th className="text-center whitespace-no-wrap">{t('lastUpdated')}</th>
                <th className="text-center whitespace-no-wrap">{t('status')}</th>
                <th className="text-center whitespace-no-wrap">{t('totalRecords')}</th>
                <th className="text-center whitespace-no-wrap">{t('tools')}</th>
              </tr>
            </thead>
            <tbody>
              {tc.isDataReady && tc.data.map((item) => (
                <tr
                  onClick={() => {
                    if (item.api_list in datasets) {
                      history.push(`${match.url}${item.api_list.replace(/^\/api\//, '')}`);
                    }
                  }}
                  key={item.id}
                  className={`intro-x ${item.api_list in datasets ? 'cursor-pointer hover:shadow-xl' : 'cursor-not-allowed'}`}
                >
                  <td>
                    {item.id}
                  </td>
                  <td>
                    {i18n.language === 'en' ? item.name_eng : item.name}
                  </td>
                  <td className="text-center">
                    {dateFormat(item.updated_at)}
                  </td>
                  <td className="text-center">
                    {item.status}
                  </td>
                  <td className="text-center">
                    {item.total_records}
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      {item.api_list in datasets ? (
                        <Link to={`${match.url}${item.api_list.replace(/^\/api\//, '')}`} className="flex items-center mr-3 text-theme-1">
                          <Eye className="w-4 h-4 mr-1 mb-1" /> {t('view')}
                        </Link>
                      ) : '---'}
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
  history: ReactRouterPropTypes.history.isRequired,
};

export default DatasetsList;
