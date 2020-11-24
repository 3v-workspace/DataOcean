import React from 'react';
// import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { Switch, Route } from 'react-router-dom';
import ProjectsTable from './ProjectsTable';
import ProjectDetail from './ProjectDetail';


const ProjectsPage = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Route
        exact
        path={`${match.path}:id/`}
        component={ProjectDetail}
      />
      <Route
        exact
        path={match.path}
        component={ProjectsTable}
      />
    </Switch>
  );
};

ProjectsPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ProjectsPage;
