// import { handleActions } from 'redux-actions';
import {
  SELECT_ORDER_FILE,
  SELECT_ORDERS,
  GENERATE_LABEL_START,
  GENERATE_LABEL,
} from './OrderActions';

// Initial State
const initialState = { data: [] };

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ORDER_FILE:
      return {
        data: action.orders,
      };
    case SELECT_ORDERS: {
      const newData = [];

      for (const [index, elem] of state.data.entries()) {
        newData.push(Object.assign({}, elem, { selected: action.orderIndexes.includes(index) }));
      }
      return {
        data: newData,
      };
    }
    case GENERATE_LABEL_START: {
      const { shipment } = action;
      const index = state.data.findIndex(o => o.shipment.ReferenceCode === shipment.ReferenceCode);

      return {
        data: [
          ...state.data.slice(0, index),
          Object.assign({}, state.data[index], { pending: true }),
          ...state.data.slice(index + 1),
        ],
      };
    }
    case GENERATE_LABEL: {
      const { labelName, labelCode, trackingNumber } = action;
      const orderIndex = state.data.findIndex(o => o.shipment.ReferenceCode === labelName);

      return {
        data: [
          ...state.data.slice(0, orderIndex),
          Object.assign({}, state.data[orderIndex], { labelCode, trackingNumber, pending: false }),
          ...state.data.slice(orderIndex + 1),
        ],
      };
    }
    default:
      return state;
  }
};

/* Selectors */

// Get all orders
export const getOrders = state => { return state.orders ? state.orders.data : []; };

// Export Reducer
export default OrderReducer;
