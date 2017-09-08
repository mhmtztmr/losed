import readCSV from '../../util/csvReader';
import callDHL from '../../util/carriers/dhl';
import { default as manualOrderFormatter } from '../../util/stores/manual';

// Export Constants
export const SELECT_ORDER_FILE = 'SELECT_ORDER_FILE';
export const SELECT_ORDERS = 'SELECT_ORDERS';
export const GENERATE_LABEL_START = 'GENERATE_LABEL_START';
export const GENERATE_LABEL = 'GENERATE_LABEL';

// Export Actions
export default {
  selectOrderFile(orders) {
    return {
      type: SELECT_ORDER_FILE,
      orders,
    };
  },
  selectOrderFileRequest(csvFileContent) {
    return (dispatch) => {
      return readCSV(csvFileContent).then(orders => {
        const formattedOrders = [];
        for (const order of orders) {
          formattedOrders.push({
            shipment: manualOrderFormatter.buildShipment(order),
            shipTo: manualOrderFormatter.buildShipTo(order),
          });
        }
        dispatch(this.selectOrderFile(formattedOrders));
      });
    };
  },
  selectOrders(orderIndexes) {
    return {
      type: SELECT_ORDERS,
      orderIndexes,
    };
  },
  generateLabel(labelObject) {
    const labelName = labelObject.Request.ShipmentData.ReferenceCode;
    let labelCode = '';
    let trackingNumber = '';
    if (labelObject.Response.LabelImage) {
      labelCode = labelObject.Response.LabelImage[0].OutputImage[0];
      trackingNumber = labelObject.Response.AirwayBillNumber;
    }

    return {
      type: GENERATE_LABEL,
      labelName,
      labelCode,
      trackingNumber,
    };
  },
  generateLabelStart(shipment) {
    return {
      type: GENERATE_LABEL_START,
      shipment,
    };
  },
  generateLabelRequest(accessData, accountData, shipFromData, shipmentData, shipToData) {
    return (dispatch) => {
      dispatch(this.generateLabelStart(shipmentData));
      return callDHL(accessData, accountData, shipFromData, shipmentData, shipToData)
        .then(labelObject => dispatch(this.generateLabel(labelObject)));
    };
  },
};
