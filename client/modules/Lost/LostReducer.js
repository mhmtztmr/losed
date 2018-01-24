import { ADD_LOST, ADD_LOSTS, DELETE_LOST } from './LostActions';

// Initial State
const initialState = { data: [] };

const LostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOST :
      return {
        data: [action.lost, ...state.data],
      };

    case ADD_LOSTS :
      return {
        data: action.losts,
      };

    case DELETE_LOST :
      return {
        data: state.data.filter(lost => lost.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all losts
export const getLosts = state => state.losts.data;

// Get lost by cuid
export const getLost = (state, cuid) => state.losts.data.filter(lost => lost.cuid === cuid)[0];

// Export Reducer
export default LostReducer;
