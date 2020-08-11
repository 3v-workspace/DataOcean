import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ReactRouterPropTypes } from 'utils/prop-types';
import Route404 from 'components/pages/Route404';
import DatasetsList from 'components/pages/datasets/DatasetsList';
import DatasetDetail from 'components/pages/datasets/DatasetDetail';
import KvedList from 'components/pages/datasets/kved/KvedList';
import CompanyList from 'components/pages/datasets/company/CompanyList';
import StreetList from 'components/pages/datasets/street/StreetList';

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
