import {
  EDIT_CAR,
  DELETE_CAR,
  SAVE_CAR,
  EDIT_ORDER,
  DELETE_ORDER,
  SAVE_ORDER,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  cars: null,
  orders: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload]
      };
    case EDIT_CAR:
        return {
            ...state,
            cars: [...state.cars, action.payload]
        };
    case DELETE_CAR:
        return {
            ...state,
            cars: [
                ...state.cars.filter(val => val.id !== action.payload)
            ]
        };
    case SAVE_ORDER:
      return {
        ...state,
          orders: [...state.orders, action.payload]
      };
    case EDIT_ORDER:
        return {
            ...state,
            orders: [...state.orders, action.payload]
        };
    case DELETE_ORDER:
        return {
            ...state,
            orders: [
                ...state.orders.filter(val => val.id !== action.payload)
            ]
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
