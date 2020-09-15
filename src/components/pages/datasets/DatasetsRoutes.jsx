import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import Route404 from 'components/pages/Route404';
import DatasetsList from './DatasetsList';
import DatasetDetail from './DatasetDetail';
import KvedList from './kved/KvedList';
import CompanyList from './company/CompanyList';
import StreetList from './street/StreetList';
import FopList from './company/FopList';
import PepList from './pep/PepList';

const DatasetsRoutes = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Route
        exact
        path={`${match.path}:id/kved/`}
        component={KvedList}
      />
      <Route
        exact
        path={`${match.path}:id/companies/`}
        component={CompanyList}
      />
      <Route
        exact
        path={`${match.path}:id/streets/`}
        component={StreetList}
      />
      <Route
        exact
        path={`${match.path}:id/fop/`}
        component={FopList}
      />
      <Route
        exact
        path={`${match.path}:id/pep/`}
        component={PepList}
      />
      <Route
        exact
        path={`${match.path}:id/`}
        component={DatasetDetail}
      />
      <Route
        exact
        path={`${match.path}`}
        component={DatasetsList}
      />
      <Route404 />
    </Switch>
  );
};

DatasetsRoutes.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default DatasetsRoutes;
