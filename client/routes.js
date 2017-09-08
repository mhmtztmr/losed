/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Auth from './util/auth';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function (deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Home/pages/HomePage/HomePage');
  require('./modules/Auth/pages/LoginPage/LoginPage');
  require('./modules/Auth/pages/SignupPage/SignupPage');
  require('./modules/Dashboard/pages/DashboardPage/DashboardPage');
  require('./modules/Profile/pages/ProfilePage/ProfilePage');
  require('./modules/Post/pages/PostListPage/PostListPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Home/pages/HomePage/HomePage').default);
        });
      }}
    />
    <Route
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/LoginPage/LoginPage').default);
        });
      }}
    />
    <Route
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Auth/pages/SignupPage/SignupPage').default);
        });
      }}
    />
    <Route
      path="/dashboard"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Dashboard/pages/DashboardPage/DashboardPage').default);
        });
      }}
    />
    <Route
      path="/profile"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Profile/pages/ProfilePage/ProfilePage').default);
        });
      }}
    />
    <Route
      path="/posts"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
  </Route>
);
