import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './AuthActions';

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user, isAuthenticated, token } = action.payload;

      return {
        user,
        isAuthenticated,
        token,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        isAuthenticated: false,
        token: null,
      };
    }

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default AuthReducer;
