import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export const AUTH_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/auth`) :
  '/auth';

function http(URL, method = 'get', body, token) {
  return new Promise((resolve, reject) => {
    return fetch(URL, {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          reject(json);
        } else {
          resolve(json);
        }
      });
  });
}

export function callApi(endpoint, method, body, token) {
  // const token = Auth.isUserAuthenticated() ? `bearer ${Auth.getToken()}` : undefined;
  console.log('token', token);
  return http(`${API_URL}/${endpoint}`, method, body, token ? `bearer${token}` : undefined);
}

export function callAuth(endpoint, method, body) {
  return http(`${AUTH_URL}/${endpoint}`, method, body);
}
