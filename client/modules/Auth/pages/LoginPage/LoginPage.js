import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (<LoginForm
      onSubmit={this.processForm}
      onChange={this.changeUser}
      errors={this.state.errors}
      successMessage={this.state.successMessage}
      user={this.state.user}
    />);
  }
}

LoginPage.contextTypes = {
  router: React.PropTypes.object,
};

LoginPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(LoginPage);
