import React from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { Button } from 'components/form-components';
import { ReactComponent as EmptyLogo } from 'images/logo_company.svg';
import { Download, Printer } from 'react-feather';
import { getLocaleField, renderDate } from 'utils';
import SearchNoResults from 'components/pages/search/SearchNoResults';
import SearchLoading from 'components/pages/search/SearchLoading';
import { useTableController } from 'components/table';
import PaginationPages from 'components/table/PaginationPages';
import { useTranslation, Trans } from 'react-i18next';
import Tooltip from 'components/Tooltip';


const CompanyResultsPage = (props) => {
  const { location } = props;
  const { t, i18n } = useTranslation();

  const urlParams = new URLSearchParams(location.search);
  const params = {
    name: urlParams.get('name'),
    edrpou: urlParams.get('edrpou'),
    country_id: urlParams.get('country_id'),
  };

  const tc = useTableController({
    url: 'company/search/',
    params,
    topOnPageChange: true,
  });

  const queryString = `${params.name || ''} ${params.edrpou || ''}`
    .replace(/\s+/g, ' ')
    .trim();

  if (!tc.isDataReady) {
    return <SearchLoading loadingText={t('companyPage.loadingText')} />;
  }
  if (tc.data.length === 0) {
    return <SearchNoResults queryString={queryString} searchPageLink="/system/home/company/" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center text-xl mb-3">
        <div>
          <Trans
            i18nKey="personPage.matchesWereFoundFor"
            values={{ count: tc.count, queryString }}
          />.
        </div>
        <Button
          className="text-sm ml-2"
          variant="outline-primary"
          link="/system/home/company/"
        >
          {t('newSearch')}
        </Button>
      </div>
      <div className="flex flex-col space-y-3">
        {tc.data.map((company) => (
          <div
            key={company.id}
            className="bg-white p-5 flex space-x-3 border border-gray-500 intro-x rounded-lg"
          >
            <div><EmptyLogo width={170} height={170} /></div>

            <div className="flex-grow">
              <div className="text-xl font-bold">
                {i18n.language === 'en' ? company.name_en : company.name}
              </div>
              <table>
                <tbody>
                  {company.status && (
                    <tr>
                      <td>{t('status')}:</td>
                      <td className="font-bold pl-2">{company.status}</td>
                    </tr>
                  )}
                  {company.edrpou && (
                    <tr>
                      <td>{t('identificationNumber')}:</td>
                      <td className="font-bold pl-2">{company.edrpou}</td>
                    </tr>
                  )}
                  {company.country && (
                    <tr>
                      <td>{t('countryOfRegistration')}:</td>
                      <td className="font-bold pl-2">{getLocaleField(company.country, 'name')}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between">
              <div className="text-right">
                {t('updatedAt')}: <br />
                {renderDate(company.updated_at)}
              </div>
              <div>
                <div className="flex justify-end py-5">
                  <Tooltip
                    content={t('inDevelopment')}
                    position="top"
                    noContainer
                  >
                    <div className="flex">
                      <Download className="w-5 h-5 mr-5" />
                      <Printer className="w-5 h-5" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center my-4">
        <Button
          className="mb-4"
          variant="outline-primary"
          onClick={() => tc.nextPage()}
        >
          {t('nextPage')}
        </Button>
        <PaginationPages tableController={tc} />
      </div>
    </div>
  );
};

CompanyResultsPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default CompanyResultsPage;
