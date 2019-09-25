import {
  GET_CARS,
  EDIT_CAR,
  DELETE_CAR,
  SAVE_CAR,
  GET_ORDERS,
  EDIT_ORDER,
  DELETE_ORDER,
  SAVE_ORDER,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  cars: null,
  orders: null,
  errors: null,
  isEditedCar: false,
  isDeletedCar: false,
  isEditedOrder: false,
  isDeletedOrder: false,
  changeToForm: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        isEditedCar: false,
        isDeletedCar: false,
        changeToForm: false
      };
    case SAVE_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload]
      };
    case EDIT_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload],
        isEditedCar: true
      };
    case DELETE_CAR:
      return {
        ...state,
        cars: [...state.cars.filter(val => val.id !== action.payload)],
        isDeletedCar: true
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        isEditedOrder: false,
        isDeletedOrder: false,
        changeToForm: false
      };
    case SAVE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        changeToForm: false
      };
    case EDIT_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        isEditedOrder: true,
        changeToForm: true
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: [...state.orders.filter(val => val.id !== action.payload)],
        isDeletedOrder: true
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
