import { callApi } from '../../util/apiCaller';

// Export Constants
export const FETCH_USER_PROFILE_START = 'FETCH_USER_PROFILE_START';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

// Export Actions
export default {
  fetchUserProfileSuccess(profile) {
    return {
      type: FETCH_USER_PROFILE_SUCCESS,
      payload: {
        profile,
      },
    };
  },
  fetchUserProfileFailure() {
    // return () => {
    //   browserHistory.push('/login');
    // };
  },
  fetchUserProfileStart() {
    return {
      type: FETCH_USER_PROFILE_START,
    };
  },
  fetchUserProfileRequest() {
    return (dispatch, getState) => {
      dispatch(this.fetchUserProfileStart());
      return callApi('profile', undefined, undefined, getState().auth.token).then(res => {
        dispatch(this.fetchUserProfileSuccess(res));
      }).catch(err => {
        dispatch(this.fetchUserProfileFailure(err));
      });
    };
  },
};
