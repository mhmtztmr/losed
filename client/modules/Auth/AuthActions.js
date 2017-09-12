import { callAuth } from '../../util/apiCaller';
import Auth from '../../util/auth';
import { browserHistory } from 'react-router';

// Export Constants
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_FINISH = 'SIGNUP_FINISH';

// Export Actions
export default {
  signupFinish() {
    return () => {
      browserHistory.push('/login');
    };
  },
  signupStart() {
    return {
      type: SIGNUP_START,
    };
  },
  signupRequest(name, email, password) {
    return (dispatch) => {
      dispatch(this.signupStart());
      return callAuth('signup', 'post', {
        name,
        email,
        password,
      }).then(res => dispatch(this.signupFinish(res)));
    };
  },
  loginSuccess(res) {
    return {
      type: LOGIN_SUCCESS,
      payload: {
        user: res.user,
        isAuthenticated: true,
      },
    };
  },
  loginFailure() {
    return () => {
      browserHistory.push('/login');
    };
  },
  loginStart() {
    return {
      type: LOGIN_START,
    };
  },
  loginRequest(email, password) {
    return (dispatch) => {
      dispatch(this.loginStart());
      return callAuth('login', 'post', {
        email,
        password,
      }).then(res => {
        dispatch(this.loginSuccess(res));
        Auth.authenticateUser(res.token);
        browserHistory.push('/dashboard');
      },
        err => dispatch(this.loginFailure(err)));
    };
  },
};
