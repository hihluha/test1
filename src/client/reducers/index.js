import { combineReducers } from "redux/es/redux";

import authReducer from "./authReducer";
import customersReducer from "./customersReducer";

export default combineReducers({
  auth: authReducer,
  customer: customersReducer
});
