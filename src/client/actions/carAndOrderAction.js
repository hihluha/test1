import {
  EDIT_CAR,
  DELETE_CAR,
  SAVE_CAR,
  EDIT_ORDER,
  DELETE_ORDER,
  SAVE_ORDER,
  GET_ERRORS
} from "./types";

import axios from "axios";

axios.defaults.withCredentials = true;

export function saveCarOROrder(name, data) {
  const urlWork =
    name === "car"
      ? "http://localhost:5000/customers/savecar"
      : "http://localhost:5000/orders/saveorder";
  const typeChoose =
    urlWork === "http://localhost:5000/customers/savecar"
      ? SAVE_CAR
      : SAVE_ORDER;
  return dispatch => {
    axios
      .post(urlWork, data)
      .then(res => {
        dispatch({
          type: typeChoose,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
      });
  };
}

export function editCarOROrder(name, id) {
  const urlWorkEdit =
    name === "car"
      ? "http://localhost:5000/customers/editcar"
      : "http://localhost:5000/orders/editorder";
  const typeChoose =
    urlWorkEdit === "http://localhost:5000/customers/editcar"
      ? EDIT_CAR
      : EDIT_ORDER;
  return dispatch => {
    axios
      .patch(urlWorkEdit, { id })
      .then(res => {
        dispatch({
          type: typeChoose,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
      });
  };
}
export function deleteCarOROrder(name, id) {
  const urlWorkDelete =
    name === "car"
      ? "http://localhost:5000/customers/deletecar"
      : "http://localhost:5000/orders/deleteorder";
  const typeChoose =
    urlWorkDelete === "http://localhost:5000/customers/deletecar"
      ? DELETE_CAR
      : DELETE_ORDER;
  return dispatch => {
    axios
      .delete(urlWorkDelete, { params: { id } })
      .then(res => {
        dispatch({
          type: typeChoose,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.request.response
        });
      });
  };
}
