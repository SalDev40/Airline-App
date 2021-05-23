import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { authReducer } from "./AuthReducer";
import { transactionReducer } from "./TransactionReducer";

const rootReducer = combineReducers({
  transaction: transactionReducer,
});
export default rootReducer;
