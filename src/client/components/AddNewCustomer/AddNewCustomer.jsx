import React, { useState } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { checkErrors } from "../../utils/checkErrors";
import { saveCustomer } from "../../actions/customersAction";

import CarForm from "../CarForm/CarForm";

import "./AddNewCustomer.css";
import "../Login/Login.css";

function AddNewCustomer({
  location,
  history,
  customers,
  saveCustomer,
  errors
}) {
  console.log(customers);

  const [customer, onChange] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    email: ""
  });

  const [submit, setSubmit] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    address: false,
    phone: false,
    email: false
  });
  const [error, setError] = useState({
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    address: null,
    phone: null,
    email: null
  });

  console.log(error);

  return (
    <form
      className="containerLog container"
      onSubmit={e => {
        e.preventDefault();

        const givenCustomer = {
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          address: customer.address,
          phone: customer.phone,
          email: customer.email
        };
        saveCustomer(givenCustomer, history);
        onChange({
          ...customer,
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          address: "",
          phone: "",
          email: ""
        });
        setSubmit({
          ...submit,
          firstName: false,
          lastName: false,
          dateOfBirth: false,
          address: false,
          phone: false,
          email: false
        });
        setError({
          ...error,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          address: null,
          phone: null,
          email: null
        });
      }}
    >
      <div className="logForm form">
        <h3>Please, enter customer's data for register.</h3>
        <div className="fields">
          <p className="errors">
            {error.firstName !== "" ? error.firstName : null}
          </p>
          <p className={errors === null ? "errorsNo" : " errors"}>{errors}</p>
          <input
            className="inputFields"
            type="text"
            name="firstName"
            value={location.data ? location.data.firstName : customer.firstName}
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
          <p className="errors">
            {error.lastName !== "" ? error.lastName : null}
          </p>
          <input
            className="inputFields"
            type="text"
            name="lastName"
            value={location.data ? location.data.lastName : customer.lastName}
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
          <p className="errors">
            {error.dateOfBirth !== "" ? error.dateOfBirth : null}
          </p>
          <input
            className="inputFields"
            type="date"
            name="dateOfBirth"
            value={customer.dateOfBirth}
            placeholder="Enter customer date of birth"
            onChange={e => {
              console.log(e.target.value);
              checkErrors(
                e,
                "dateOfBirth",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          <p className="errors">
            {error.address !== "" ? error.address : null}
          </p>
          <input
            className="inputFields"
            type="text"
            name="address"
            value={customer.address}
            placeholder="Enter customer address"
            onChange={e => {
              checkErrors(
                e,
                "address",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          <p className="errors">{error.phone !== "" ? error.phone : null}</p>
          <input
            className="inputFields"
            type="tel"
            name="phone"
            value={customer.phone}
            placeholder="(__) ___-__-__"
            onChange={e => {
              const x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
              e.target.value = !x[2] ?  '(' + x[1] + ') ': '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
              checkErrors(
                e,
                "phone",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          <p className="errors">{error.email !== "" ? error.email : null}</p>
          <input
            className="inputFields"
            type="text"
            name="email"
            value={customer.email}
            placeholder="Enter customer email"
            onChange={e => {
              checkErrors(
                e,
                "email",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          {/*<CarForm show={true} location={location.pathname} />*/}
          <button
            className="submitForm"
            // className={
            //   Object.values(error).every(item => item === "")
            //     ? "submitForm"
            //     : "disableSubmit"
            // }
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = state => {
  return {
    searchCustomer: state.customer.searchCustomer,
    customers: state.customer.customers,
    errors: state.customer.errors
  };
};

const mapDispatchToProps = {
  saveCustomer
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNewCustomer)
);
