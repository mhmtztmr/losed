import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../../components/SignupForm';
import authActions from '../../AuthActions';

class SignupPage extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
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

    // create a string for an HTTP body message
    dispatch(authActions.signupRequest(this.state.user.name, this.state.user.email, this.state.user.password));
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

  /**
   * Render the component.
   */
  render() {
    return (
      <SignupForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

SignupPage.contextTypes = {
  router: React.PropTypes.object,
};

SignupPage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(SignupPage);
