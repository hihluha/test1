import axios from 'axios';
import { SIGN_IN_USER, GET_ERRORS, LOG_OUT_USER } from "./types";

axios.defaults.withCredentials = true;

export function loginUser (data, history) {
    return dispatch => {
        return axios
            .post("http://localhost:5000/user/sign_in", data)
            .then(res => {
                dispatch({
                    type: SIGN_IN_USER,
                    payload: res.data
                });
                history.push('/customers');
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.request.response
                });
            });
}}

export function logoutUser() {
    return dispatch => {
        return axios
            .post("http://localhost:5000/user/logout")
            .then(res => {
                sessionStorage.removeItem('app_state');
                dispatch({
                    type: LOG_OUT_USER,
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