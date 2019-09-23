import {
  CHECK_EXISTING_CUSTOMER,
  GET_ERRORS,
  SAVE_NEW_CUSTOMER,
  GET_CUSTOMERS,
  GET_NEW_CUSTOMERS,
  GET_CUSTOMER
} from "../actions/types";

const initialState = {
  customers: null,
  customer: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_EXISTING_CUSTOMER:
      return {
        ...state,
          customer: action.payload,
      };
    case SAVE_NEW_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        searchCustomer: null,
        newCustomer: null
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case GET_NEW_CUSTOMERS:
      return {
        ...state,
          customer: action.payload
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};
