import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../components/Layout';
import ActivityFormContainer from '../containers/ActivityFormContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={ActivityFormContainer} />
  </Route>
)

export default routes;
