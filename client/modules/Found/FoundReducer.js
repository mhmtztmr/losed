import { ADD_FOUND, ADD_FOUNDS, DELETE_FOUND } from './FoundActions';

// Initial State
const initialState = { data: [] };

const FoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOUND :
      return {
        data: [action.found, ...state.data],
      };

    case ADD_FOUNDS :
      return {
        data: action.founds,
      };

    case DELETE_FOUND :
      return {
        data: state.data.filter(found => found.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all founds
export const getFounds = state => state.founds.data;

// Get found by cuid
export const getFound = (state, cuid) => state.founds.data.filter(found => found.cuid === cuid)[0];

// Export Reducer
export default FoundReducer;
