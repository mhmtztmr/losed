/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./modules/Lost/pages/LostListPage/LostListPage');
  require('./modules/Lost/pages/LostDetailPage/LostDetailPage');
  require('./modules/Found/pages/FoundListPage/FoundListPage');
  require('./modules/Found/pages/FoundDetailPage/FoundDetailPage');
  require('./modules/Home/pages/HomePage/HomePage');
  require('./modules/Auth/pages/LoginPage/LoginPage');
  require('./modules/Auth/pages/SignupPage/SignupPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (store) => {
  const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    console.log('isAuthenticated:', state.auth.isAuthenticated); // eslint-disable-line

    if (!state.auth.isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
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
        path="/posts"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
          });
        }}
        onEnter={authRequired}
      />
      <Route
        path="/posts/:slug-:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
          });
        }}
      />
      <Route
        path="/losts"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Lost/pages/LostListPage/LostListPage').default);
          });
        }}
        onEnter={authRequired}
      />
      <Route
        path="/losts/:slug-:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Lost/pages/LostDetailPage/LostDetailPage').default);
          });
        }}
      />
      <Route
        path="/founds"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Found/pages/FoundListPage/FoundListPage').default);
          });
        }}
        onEnter={authRequired}
      />
      <Route
        path="/founds/:slug-:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Found/pages/FoundDetailPage/FoundDetailPage').default);
          });
        }}
      />
    </Route>
  );
};
