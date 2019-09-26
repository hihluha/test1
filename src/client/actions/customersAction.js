import {
  CHECK_EXISTING_CUSTOMER,
  GET_ERRORS,
  SAVE_NEW_CUSTOMER,
  GET_CUSTOMERS,
  GET_NEW_CUSTOMERS,
  GET_CUSTOMER
} from "./types";
import axios from "axios";

axios.defaults.withCredentials = true;

export function getCustomers(history) {
  return dispatch => {
    return axios
      .get("http://localhost:5000/customers/all")
      .then(res => {
        dispatch({
          type: GET_CUSTOMERS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
        history.push("/");
      });
  };
}

export function getCustomer(id, history) {
  return dispatch => {
    return axios
      .get("http://localhost:5000/customers/customer", {params: { id }})
      .then(res => {
        dispatch({
          type: GET_CUSTOMER,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
        history.push("/");
      });
  };
}

export function checkCustomer(user, history) {
  return dispatch => {
    return axios
      .post("http://localhost:5000/customers/search", user)
      .then(res => {
        dispatch({
          type: CHECK_EXISTING_CUSTOMER,
          payload: res.data
        });
        history.push(`/customers/${res.data[0]._id}`);
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
        history.push("/");
      });
  };
}

export function saveCustomer(customer, history) {
  return dispatch => {
    return axios
      .post("http://localhost:5000/customers/save", customer)
      .then(res => {
        dispatch({
          type: SAVE_NEW_CUSTOMER,
          payload: res.data
        });
        return axios
          .get("http://localhost:5000/customers/newcustomer", {
            params: { email: customer.email }
          })
          .then(res => {
            dispatch({
              type: GET_NEW_CUSTOMERS,
              payload: res.data
            });
            history.push(`/customers/${res.data[0]._id}`);
          });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
        history.push("/");
      });
  };
}
