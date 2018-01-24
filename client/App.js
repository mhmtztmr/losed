/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from './modules/Intl/IntlWrapper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import Routes
import getRoutes from './routes';

// Base stylesheet
require('./main.css');

export default function App(props) {
  const { store } = props;
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <IntlWrapper>
          <Router history={browserHistory}>
            {getRoutes(store)}
          </Router>
        </IntlWrapper>
      </MuiThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
