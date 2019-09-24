import { combineReducers } from "redux/es/redux";

import authReducer from "./authReducer";
import customersReducer from "./customersReducer";
import carAndOrderReducer from "./carAndOrderReducer";

export default combineReducers({
  auth: authReducer,
  customer: customersReducer,
  carAndOrder: carAndOrderReducer
});
