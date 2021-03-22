import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import Route404 from 'components/pages/Route404';
import DatasetsList from './DatasetsList';
import KvedList from './kved/KvedList';
import CompanyUkList from './company/CompanyUkList';
import CompanyUkrList from './company/CompanyUkrList';
import StreetList from './street/StreetList';
import FopList from './company/FopList';
import PepList from './pep/PepList';
import KoatuuList from './koatuu/KoatuuList';

const DatasetsRoutes = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Route
        exact
        path={`${match.path}kved/`}
        component={KvedList}
      />
      <Route
        exact
        path={`${match.path}company/ukr/`}
        component={CompanyUkrList}
      />
      <Route
        exact
        path={`${match.path}company/uk/`}
        component={CompanyUkList}
      />
      <Route
        exact
        path={`${match.path}company/`}
        // component={CompanyList}
        render={() => <Redirect to={`${match.url}/company/ukr/`} />}
      />
      <Route
        exact
        path={`${match.path}street/`}
        component={StreetList}
      />
      <Route
        exact
        path={`${match.path}fop/`}
        component={FopList}
      />
      <Route
        exact
        path={`${match.path}koatuu/`}
        component={KoatuuList}
      />
      <Route
        exact
        path={`${match.path}pep/`}
        component={PepList}
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
