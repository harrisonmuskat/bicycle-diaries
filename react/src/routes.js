import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../components/Layout';
import App from '../containers/App';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={App} />
  </Route>
)

export default routes;
