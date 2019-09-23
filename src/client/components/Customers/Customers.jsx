import React, { useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter, NavLink } from "react-router-dom";

import { getCustomers, getCustomer } from "../../actions/customersAction";

import "./Customers.css";
import "../OneCustomer/OneCustomer.css";

function Customers({ getCustomers, customers, getCustomer, history }) {
  useEffect(() => {
    getCustomers(history);
  }, []);

  const createEachCustomerCard =
    customers === null
      ? "There are no users"
      : customers.map((customer, index) => {
          const customerCars =
            customer.cars === undefined || customer.cars.length === 0
              ? "There are no cars"
              : customer.cars.map(car => {
                  return (
                    <div className="customerCard" key={customer._id}>
                      <h2>
                        {car.make} - {car.model}, {car.year}
                      </h2>
                      <p>{car.vinCar}</p>
                    </div>
                  );
                });
          return (
            <NavLink
              to={`/customers/${customer._id}`}
              key={customer._id}
              className="customerCard"
              onClick={() => {
                getCustomer(customer._id, history);
              }}
            >
              <div className="header">
                <h2 className="item">{`${customer.firstName} ${customer.lastName}`}</h2>
                <p>Related cars:</p>
                {customerCars === "There are no cars" ? (
                  <h3>There are no cars</h3>
                ) : (
                  <ol className="customerCard">
                    <li key={customer._id}>{customerCars}</li>
                  </ol>
                )}

                  <button type="button"  className="submitForm add">See more</button>

              </div>
            </NavLink>
          );
        });

  return <div className="customerContainer">{createEachCustomerCard}</div>;
}

const mapStateToProps = state => {
  return {
    customers: state.customer.customers,
    errors: state.customer.errors
  };
};

const mapDispatchToProps = {
  getCustomers,
  getCustomer
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers));
