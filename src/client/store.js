import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const saveState = state => {
  try {
    const serialisedState = JSON.stringify(state);
    window.sessionStorage.setItem("app_state", serialisedState);
  } catch (err) {
    // Log errors here
  }
};

const loadState = () => {
  try {
    const serialisedState = window.sessionStorage.getItem("app_state");

    if (!serialisedState) return undefined;

    return JSON.parse(serialisedState);
  } catch (err) {
    // Return undefined if localStorage is not available,
    // or data could not be de-serialised,
    // or there was some other error
    return undefined;
  }
};

const oldState = loadState();

const store = createStore(
  rootReducer,
    oldState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
