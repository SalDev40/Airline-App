import * as transActions from "../actions/TransactionAction";

const initialState = {
  booking: {},
  selectedFlights: {},
  passengersInfo: [],
  customerInfo: {},
  receiptInfo: {},
  

};

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case transActions.STORE_BOOKING:
      return {
        ...state,
        booking: action.bookingData,
      };
    case transActions.STORE_SELECTED_FLIGHTS:
      return {
        ...state,
        selectedFlights: {
          goingFlight: action.goingFlight,
          returningFlight: action.returningFlight,
        },
      };
    case transActions.STORE_PASSENGERS_INFO:
      return {
        ...state,
        passengersInfo: action.passengers,
      };
    case transActions.STORE_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: action.customer,
      };
    case transActions.STORE_RECEIPT_INFO:
      return {
        ...state,
        receiptInfo: action.receipt,
      };
    default: {
      return state;
    }
  }
}
