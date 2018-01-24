import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import authActions from '../../../Auth/AuthActions';

class HomePage extends Component {

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

    this.logout = this.logout.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  logout(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    dispatch(authActions.logoutRequest());
  }

  render() {
    const { isAuthenticated } = this.props;
    let links = null;
    if (isAuthenticated) {
      links = (<div>
        <Link to={'/posts'} >
          Posts
        </Link>
        <Link to={'/losts'} >
          Losts
        </Link>
        <Link to={'/founds'} >
          Founds
        </Link>
        <Link to={'#'} onClick={this.logout} >
          Logout
        </Link>
        <RaisedButton style={{ margin: 12 }} type="submit" label="Material UI Test Button" primary />
      </div>);
    } else {
      links = (<div>
        <div><Link to="/login"><RaisedButton primary label="Login" /></Link></div>
        <div><Link to="/signup"><RaisedButton primary label="Signup" /></Link></div>
      </div>);
    }

    return (
      <div>
        {links}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

HomePage.contextTypes = {
  router: React.PropTypes.object,
};

HomePage.propTypes = {
  isAuthenticated: React.PropTypes.bool,
};

export default connect(mapStateToProps)(HomePage);
