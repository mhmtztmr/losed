/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import losts from './modules/Lost/LostReducer';
import founds from './modules/Found/FoundReducer';
import auth from './modules/Auth/AuthReducer';
import user from './modules/User/UserReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  losts,
  founds,
  intl,
  auth,
  user,
});
