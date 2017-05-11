import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../components/Layout';
import App from '../containers/App';
import ProfileContainer from '../containers/ProfileContainer';
import EditStoryFormContainer from '../containers/EditStoryFormContainer';

let routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={App} />
    <Route path="/users/:userId" component={ProfileContainer}/>
    <Route path="/stories/:id" component={EditStoryFormContainer} />
  </Route>
)

export default routes;
