import React from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { Button } from 'components/form-components';
import { ReactComponent as PepIcon } from 'images/logo_person.svg';
import { Download, Printer } from 'react-feather';
import { getLocaleField, renderDate } from 'utils';
import SearchNoResults from 'components/pages/search/SearchNoResults';
import SearchLoading from 'components/pages/search/SearchLoading';
import { useTableController } from 'components/table';
import PaginationPages from 'components/table/PaginationPages';
import { useTranslation, Trans } from 'react-i18next';
import Tooltip from 'components/Tooltip';
import { PERSON_DEBUG } from 'const/testing';
import Tags from '../datasets/person/Tags';
import { BlackLine, Print } from '../../blocks';


const PersonResultsPage = (props) => {
  const { location } = props;
  const { t, i18n } = useTranslation();

  const urlParams = new URLSearchParams(location.search);
  const params = {
    first_name: urlParams.get('first_name'),
    last_name: urlParams.get('last_name'),
    middle_name: urlParams.get('middle_name'),
    country_id: urlParams.get('country_id'),
  };

  const tc = useTableController({
    url: 'person/search/',
    // defaultPageSize: 5,
    params,
    topOnPageChange: true,
  });

  const queryString = `${params.last_name || ''} ${params.first_name || ''} ${params.middle_name || ''}`
    .replace(/\s+/g, ' ')
    .trim();

  const extactCitizenship = (data) => {
    const countries = data.map((country) => getLocaleField(country, 'name'));
    return [...new Set(countries)].join(', ');
  };

  const extractResidence = (data) => {
    const residence = data.map((place) => place.residence);
    return [...new Set(residence)].join(', ');
  };

  if (!params.last_name) {
    return <SearchNoResults queryString={queryString} />;
  }
  if (!tc.isDataReady) {
    return <SearchLoading />;
  }
  if (tc.data.length === 0) {
    return <SearchNoResults queryString={queryString} />;
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
          link="/system/home/person/"
        >
          {t('newSearch')}
        </Button>
      </div>
      <div className="flex flex-col space-y-3">
        {tc.data.map((person) => (
          <div
            key={person.id}
            className="bg-white p-6 flex-row box-border box-border-radius-1 intro-x"
          >
            <div className="flex space-x-7.5">
              <div><PepIcon width={170} height={170} /></div>

              <div className="flex-grow block-black">
                <div className="fullname-text">
                  {i18n.language === 'en' ? person.full_name : person.full_name_original}
                </div>
                <div className="flex flex-wrap mt-4 mb-6">
                  <Tags person={person} type="search" />
                </div>
                <table>
                  <tbody>
                    {person.date_of_birth && (
                      <tr className="space-bottom">
                        <td className="font-medium">{t('dateOfBirth')}:</td>
                        <td className="pl-1.3">{renderDate(person.date_of_birth)}</td>
                      </tr>
                    )}
                    {!!Object.keys(person.citizenship_data).length && (
                      <tr className="space-bottom">
                        <td className="font-medium">{t('knownCitizenship')}:</td>
                        <td className="pl-1.3">
                          {extactCitizenship(person.citizenship_data)}
                        </td>
                      </tr>
                    )}
                    {!!Object.keys(person.residence_data).length && (
                      <tr className="space-bottom">
                        <td className="font-medium">{t('countryOfResidence')}:</td>
                        <td className="pl-1.3">{extractResidence(person.residence_data)}</td>
                      </tr>
                    )}
                    {person.gender && (
                      <tr className="space-bottom">
                        <td className="font-medium">{t('gender')}:</td>
                        <td className="pl-1.3">{person.gender_display}</td>
                      </tr>
                    )}
                    {person.pep_data[0] && (
                      <tr className="space-bottom">
                        <td className="font-medium">{t('pepCategory')}:</td>
                        <td className="pl-1.3">{person.pep_data[0]?.pep_type_display}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`flex justify-between ${person.is_dead ? 'pr-5' : ''}`}>
              <div className="py-2">
                {t('updatedAt')}: <br />
                {renderDate(person.updated_at)}
              </div>
              <div className="flex py-2">
                <Tooltip
                  content={t('inDevelopment')}
                  position="top"
                  className="flex items-center"
                >
                  <Download className="w-5 h-5" />
                  <Print className="w-5 h-5 mx-8" />
                </Tooltip>
                {PERSON_DEBUG ? (
                  <>
                    {person.pep_data.map((pep) => (
                      <Button
                        className="w-40 h-10 blue button-border"
                        key={pep.id}
                        variant="blank"
                        link={`/system/datasets/pep/${pep.id}/`}
                      >
                        Related PEP {pep.id}
                      </Button>
                    ))}
                    {person.sanction_data.map((sanction) => (
                      <Button
                        className="w-40 h-10 blue button-border"
                        key={sanction.id}
                        variant="blank"
                        link={`/system/datasets/person-sanction/${sanction.id}/`}
                      >
                        Related sanction {sanction.id}
                      </Button>
                    ))}
                    <Button
                      className="w-40 h-10 blue button-border"
                      variant="blank"
                      link={`/system/home/person/${person.id}/`}
                    >
                      Person Detail Page
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-40 h-10 blue button-border"
                    variant="blank"
                    link={`/system/datasets/pep/${person.pep_data[0]?.id}/`}
                  >
                    <p className="uppercase text-xs" style={{ letterSpacing: '0.07rem' }}>{t('view')}</p>
                  </Button>
                )}
                {person.is_dead && (
                  <div className="flex items-end -mr-11 -mb-9"><BlackLine width={60} height={60} /></div>
                )}
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

PersonResultsPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

export default PersonResultsPage;
