import { callApi } from '../../util/apiCaller';

// Export Constants
export const ADD_LOST = 'ADD_LOST';
export const ADD_LOSTS = 'ADD_LOSTS';
export const DELETE_LOST = 'DELETE_LOST';

// Export Actions
export function addLost(lost) {
  return {
    type: ADD_LOST,
    lost,
  };
}

export function addLostRequest(lost) {
  return (dispatch, getState) => {
    return callApi('losts', 'post', {
      lost: {
        name: lost.name,
        title: lost.title,
        content: lost.content,
      },
    }, getState().auth.token).then(res => dispatch(addLost(res.lost)));
  };
}

export function addLosts(losts) {
  return {
    type: ADD_LOSTS,
    losts,
  };
}

export function fetchLosts() {
  console.log('fetchhh'); // eslint-disable-line
  return (dispatch, getState) => {
    return callApi('losts', undefined, undefined, getState().auth.token).then(res => {
      dispatch(addLosts(res.losts));
    });
  };
}

export function fetchLost(cuid) {
  return (dispatch) => {
    return callApi(`losts/${cuid}`).then(res => dispatch(addLost(res.lost)));
  };
}

export function deleteLost(cuid) {
  return {
    type: DELETE_LOST,
    cuid,
  };
}

export function deleteLostRequest(cuid) {
  return (dispatch) => {
    return callApi(`losts/${cuid}`, 'delete').then(() => dispatch(deleteLost(cuid)));
  };
}
