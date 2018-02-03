import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import LoginForm from '../../components/LoginForm';
import authActions from '../../AuthActions';

class LoginPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      successMessage: '',
      user: {
        email: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const { dispatch } = this.props;

    dispatch(authActions.loginRequest(this.state.user.email, this.state.user.password));
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  responseGoogle(response) {
    console.log(response);
    const { dispatch } = this.props;
    dispatch(authActions.loginRequestGoogle(response.tokenId));
  }

  render() {
    return (<div>
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
      <GoogleLogin
        clientId="315747158875-oob0scjn1hh0o8a2qijvufbmmv4tevh8.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    </div>);
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};

LoginPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(LoginPage);
