import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import logoPerson from 'images/logoPerson.svg';
import logoBag from 'images/logoBag.svg';
import { ReactRouterPropTypes } from 'utils/prop-types';
import PersonSearchForm from 'components/pages/search/PersonSearchForm';
import Tooltip from 'components/Tooltip';
import search_girl_url from 'images/search_girl.png';

const SearchPage = ({ match }) => {
  const { t } = useTranslation();

  useEffect(() => {
    new Image().src = search_girl_url;
  }, []);

  return (
    <div className="box mt-5 p-5 pb-10">
      <div className="nav-tabs flex justify-center space-x-4">
        <NavLink
          to={`${match.path}person/`}
          data-toggle="tab"
          className="py-2 flex items-center"
          activeClassName="active"
        >
          <img src={logoPerson} alt="person_logo" className="w-4 h-4 mr-2" />
          {t('searchPerson')}
        </NavLink>
        <Tooltip
          content={t('inDevelopment')}
          position="top"
          className="text-gray-500"
        >
          <div className="py-2 flex items-center">
            <img src={logoBag} alt="logoBag" className="w-4 h-4 mr-2 flex items-center" />
            {t('searchCompany')}
          </div>
        </Tooltip>
      </div>
      <Switch>
        <Route
          path={`${match.path}person/`}
          component={PersonSearchForm}
        />
        <Route
          exact
          path={match.path}
          render={() => <Redirect to={`${match.url}person/`} />}
        />
      </Switch>
    </div>
  );
};

SearchPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default SearchPage;
