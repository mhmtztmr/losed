import { callApi } from '../../util/apiCaller';

// Export Constants
export const ADD_FOUND = 'ADD_FOUND';
export const ADD_FOUNDS = 'ADD_FOUNDS';
export const DELETE_FOUND = 'DELETE_FOUND';

// Export Actions
export function addFound(found) {
  return {
    type: ADD_FOUND,
    found,
  };
}

export function addFoundRequest(found) {
  return (dispatch, getState) => {
    return callApi('founds', 'post', {
      found: {
        name: found.name,
        title: found.title,
        content: found.content,
      },
    }, getState().auth.token).then(res => dispatch(addFound(res.found)));
  };
}

export function addFounds(founds) {
  return {
    type: ADD_FOUNDS,
    founds,
  };
}

export function fetchFounds() {
  console.log('fetchhh'); // eslint-disable-line
  return (dispatch, getState) => {
    return callApi('founds', undefined, undefined, getState().auth.token).then(res => {
      dispatch(addFounds(res.founds));
    });
  };
}

export function fetchFound(cuid) {
  return (dispatch) => {
    return callApi(`founds/${cuid}`).then(res => dispatch(addFound(res.found)));
  };
}

export function deleteFound(cuid) {
  return {
    type: DELETE_FOUND,
    cuid,
  };
}

export function deleteFoundRequest(cuid) {
  return (dispatch) => {
    return callApi(`founds/${cuid}`, 'delete').then(() => dispatch(deleteFound(cuid)));
  };
}
