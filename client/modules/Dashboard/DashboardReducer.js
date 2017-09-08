// import { handleActions } from 'redux-actions';
// import {
//   SELECT_ORDER_FILE,
//   SELECT_ORDERS,
//   GENERATE_LABEL_START,
//   GENERATE_LABEL,
// } from './OrderActions';

// Initial State
const initialState = { data: [] };

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_ORDER_FILE':
      return {
        data: action.orders,
      };
    default:
      return state;
  }
};

/* Selectors */

// Export Reducer
export default DashboardReducer;
