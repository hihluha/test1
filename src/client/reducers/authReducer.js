import { SIGN_IN_USER, GET_ERRORS, LOG_OUT_USER } from "../actions/types";

const initialState = {
    isAuth: null,
    errors: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return {
                ...state,
                isAuth: action.payload.auth
            };
        case GET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                isAuth: false
            };
        case LOG_OUT_USER:
            return {
                ...state,
                isAuth: action.payload.auth
            };
        default:
            return state;
    }
};