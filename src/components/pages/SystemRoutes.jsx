import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import ReportConstructorPage from 'components/pages/system/ReportConstructorPage';
import ContactsPage from 'components/pages/system/ContactsPage';
import DataConstructorPage from 'components/pages/system/DataConstructorPage';
import Route404 from 'components/pages/Route404';
import HelpPage from 'components/pages/help/HelpPage';
import HomePage from 'components/pages/system/HomePage';
import ProfilePage from 'components/pages/profile/ProfilePage';
import DatasetsRoutes from 'components/pages/datasets/DatasetsRoutes';
// import PepGraphPage from 'components/pages/system/PepGraphPage';
import SubscriptionsPage from 'components/pages/payment/SubscriptionsPage';
import ApiPage from 'components/pages/api/ApiPage';


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
        exact
        path={`${match.path}home/`}
        component={HomePage}
      />
      <Route
        path={`${match.path}datasets/`}
        component={DatasetsRoutes}
      />
      <Route
        exact
        path={`${match.path}report-constructor/`}
        component={ReportConstructorPage}
      />
      <Route
        exact
        path={`${match.path}data-constructor/`}
        component={DataConstructorPage}
      />
      {/*<Route*/}
      {/*  exact*/}
      {/*  path={`${match.path}pep-scheme/`}*/}
      {/*  component={PepGraphPage}*/}
      {/*/>*/}
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
