import React, { useState } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter, NavLink } from "react-router-dom";

import { checkCustomer } from "../../actions/customersAction";
import { checkErrors } from "../../utils/checkErrors";

import "../Login/Login.css";

function Search(props) {
  const [customer, onChange] = useState({
    firstName: "",
    lastName: ""
  });
  const [submit, setSubmit] = useState({
    firstName: false,
    lastName: false
  });
  const [error, setError] = useState({
    firstName: null,
    lastName: null
  });

  const { checkCustomer, history, errors } = props;

  return (
    <form
      className="containerLog"
      onSubmit={e => {
        e.preventDefault();

        const givenCustomer = {
          firstName: customer.firstName,
          lastName: customer.lastName
        };
        checkCustomer(givenCustomer, history);

        onChange({ ...customer, firstName: "", lastName: "" });
        setSubmit({...submit, firstName: false, lastName: false });
        setError({...error, firstName: null, lastName: null });
      }}
    >
      <div className="logForm">
        <h3>Please, enter customer's First Name and Last Name.</h3>
        <div className="fields">
          <p className="errors">
            {error.firstName || error.lastName !== ""
              ? error.firstName || error.lastName
              : null}
          </p>
          <p className={errors === null ? "errorsNo" : " errors"}>{errors}</p>
          <input
            className="inputFields"
            type="text"
            name="firstName"
            value={customer.firstName}
            placeholder="Enter First Name"
            onChange={e => {
              checkErrors(
                e,
                "firstName",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          <input
            className="inputFields"
            type="text"
            name="lastName"
            value={customer.lastName}
            placeholder="Enter Last Name"
            onChange={e => {
              checkErrors(
                e,
                "lastName",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
        </div>
        {errors === "No customer found" ? (
          <button className="submitForm" type="button">
            <NavLink
              to={{
                pathname: "/create",
                data: {
                  firstName: customer.firstName,
                  lastName: customer.lastName
                }
              }}
            >
              Create customer
            </NavLink>
          </button>
        ) : (
          <button
            className={
              Object.values(error).every(item => item === "")
                ? "submitForm"
                : "disableSubmit"
            }
            type="submit"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    errors: state.customer.errors,
  };
};

const mapDispatchToProps = {
  checkCustomer
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Search));
