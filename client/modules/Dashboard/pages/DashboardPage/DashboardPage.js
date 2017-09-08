import React from 'react';
import { connect } from 'react-redux';

// Import Components

// Import Actions
import authActions from '../../../Auth/AuthActions';

function DashboardPage({ auth }) {
  return (
    <div>
      Dashboard {auth.user.name}
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
DashboardPage.need = [() => { return authActions.loginRequest(); }];

DashboardPage.contextTypes = {
  router: React.PropTypes.object,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export default connect(mapStateToProps)(DashboardPage);
