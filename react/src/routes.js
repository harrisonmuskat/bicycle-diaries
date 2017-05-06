import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../components/Layout';
import App from '../containers/App';
import ProfileContainer from '../containers/ProfileContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={App} />
    <Route path="/profile" component={ProfileContainer} />
  </Route>
)

export default routes;
