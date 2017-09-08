import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class GoogleLogin extends Component {
  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      scope: 'email',
      width: 200,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn,
    });
  }

  onSignIn(/* googleUser */) {
    // const email = googleUser.getBasicProfile().getEmail();
  }

  render() {
    return (
      <div>
        <div id="g-signin2"></div>
      </div>
    );
  }
}

GoogleLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

GoogleLogin.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(GoogleLogin);
