import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import CompanyResultsPage from 'components/pages/search/CompanyResultsPage';
import ContactsPage from 'components/pages/system/ContactsPage';
import Route404 from 'components/pages/Route404';
import HelpPage from 'components/pages/help/HelpPage';
import StatisticsPage from 'components/pages/system/StatisticsPage';
import SearchPage from 'components/pages/search/SearchPage';
import ProfilePage from 'components/pages/profile/ProfilePage';
import DatasetsRoutes from 'components/pages/datasets/DatasetsRoutes';
import SubscriptionsPage from 'components/pages/payment/SubscriptionsPage';
import ApiPage from 'components/pages/api/ApiPage';
import PersonResultsPage from 'components/pages/search/PersonResultsPage';
import PersonDetail from 'components/pages/datasets/person/PersonDetail';


const SystemRoutes = (props) => {
  const { match } = props;

  useEffect(() => {
    document.body.classList.add('app');
    return () => {
      document.body.classList.remove('app');
    };
  }, []);

  return (
    <Switch>
      <Route
        path={`${match.path}datasets/`}
        component={DatasetsRoutes}
      />
      {/*<Route
        exact
        path={`${match.path}report-constructor/`}
        component={ReportConstructorPage}
      />
      <Route
        exact
        path={`${match.path}data-constructor/`}
        component={DataConstructorPage}
      />
      <Route
        exact
        path={`${match.path}pep-scheme/`}
        component={PepGraphPage}
      />*/}
      <Route
        exact
        path={`${match.path}subscriptions/`}
        component={SubscriptionsPage}
      />
      <Route
        exact
        path={`${match.path}api/`}
        component={ApiPage}
      />
      <Route
        exact
        path={`${match.path}statistics/`}
        component={StatisticsPage}
      />
      <Route
        exact
        path={`${match.path}contacts/`}
        component={ContactsPage}
      />
      <Route
        exact
        path={`${match.path}help/`}
        component={HelpPage}
      />
      <Route
        path={`${match.path}profile/`}
        component={ProfilePage}
      />
      <Route
        exact
        path={`${match.path}home/person-search/`}
        component={PersonResultsPage}
      />
      <Route
        exact
        path={`${match.path}home/person/:id/`}
        component={PersonDetail}
      />
      <Route
        exact
        path={`${match.path}home/company-search/`}
        component={CompanyResultsPage}
      />
      <Route
        path={`${match.path}home/`}
        component={SearchPage}
      />
      <Route
        exact
        path={match.path}
        render={() => <Redirect to={`${match.path}home/`} />}
      />
      <Route404 />
    </Switch>
  );
};

SystemRoutes.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default SystemRoutes;
