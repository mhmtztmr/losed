import {
  FETCH_USER_PROFILE_SUCCESS,
} from './UserActions';

// Initial State
const initialState = {
  profile: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE_SUCCESS: {
      const { profile } = action.payload;

      return {
        profile,
      };
    }

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUserProfile = state => state.user.user;

// Export Reducer
export default UserReducer;
