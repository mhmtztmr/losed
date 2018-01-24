import storage from './storage';
import cookie from './cookie';

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires,
  });
}

function removeAuthToken() {
  cookie.unset('token');
}

class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    storage.setItem('token', token);
    saveAuthToken(token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return storage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    storage.removeItem('token');
    removeAuthToken();
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return storage.getItem('token');
  }

}

export default Auth;
