import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";

import General from "./components/General";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Customers from "./components/Customers/Customers";
import OneCustomer from "./components/OneCustomer/OneCustomer";
import Search from "./components/Search/Search";
import AddNewCustomer from "./components/AddNewCustomer/AddNewCustomer";

function App({ isAuth }) {

  return (
    <BrowserRouter>
      <General>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/customers/:id" component={OneCustomer} />
          <Route exact path="/search" component={Search} />
          <Route path="/create" component={AddNewCustomer} />
          <Route path="/log_out" component={Logout} />
        </Switch>
      </General>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    errors: state.auth.errors
  };
};

export default connect(mapStateToProps)(App);
