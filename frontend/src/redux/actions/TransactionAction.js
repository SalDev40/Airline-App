export const STORE_BOOKING = "STORE_BOOKING";
export const STORE_SELECTED_FLIGHTS = "STORE_SELECTED_FLIGHTS";
export const STORE_PASSENGERS_INFO = "STORE_PASSENGERS_INFO";
export const STORE_CUSTOMER_INFO = "STORE_CUSTOMER_INFO";
export const STORE_RECEIPT_INFO = "STORE_RECEIPT_INFO";

export const storeBookingDetails = (bookingData) => {
  return {
    type: STORE_BOOKING,
    bookingData: bookingData,
  };
};

export const storeSelectedFlights = (goingFlight, returningFlight) => {
  return {
    type: STORE_SELECTED_FLIGHTS,
    goingFlight: goingFlight,
    returningFlight: returningFlight,
  };
};

export const storePassengersInfo = (passengers) => {
  return {
    type: STORE_PASSENGERS_INFO,
    passengers: passengers,
  };
};
export const storeCustomersInfo = (customer) => {
  return {
    type: STORE_CUSTOMER_INFO,
    customer: customer,
  };
};
export const storeReceiptInfo = (receipt) => {
  return {
    type: STORE_RECEIPT_INFO,
    receipt: receipt,
  };
};
