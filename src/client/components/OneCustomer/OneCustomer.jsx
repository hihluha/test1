import React, { useState, useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";

import {
  editCarOROrder,
  deleteCarOROrder
} from "../../actions/carAndOrderAction";

import CarForm from "../CarForm/CarForm";
import OrderForm from "../CarForm/OrderForm";

import "./OneCustomer.css";

function OneCustomer({
  location,
  history,
  match,
  customer,
  editCarOROrder,
  deleteCarOROrder
}) {
  const [showForm, changeShowForm] = useState(false);
  const [showFormOrder, changeShowFormOrder] = useState(false);

  const repeatedForm = (name, items, data1, data2, data3, data4, data5) => {
    if (items === null || items === undefined) {
    } else {
      return items.map(item => {
        return (
          <div className="customerCard">
            <div className="carContainer">
            <li className="header" key={item._id}>
              <h3>{`${item[data1]} ${item[data2]}, ${item[data3]}`}</h3>
              <h3>
                {[data5]} {item[data4]}
              </h3>
            </li>
            <div className="btnContainer">
              <button
                className="btn"
                onClick={() => {
                  editCarOROrder(name, item._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn"
                onClick={() => {
                  deleteCarOROrder(name, item._id);
                }}
              >
                Delete
              </button>
            </div>
            </div>
              <ol className="customerCard">
                {/*{repeatedForm(customer.orders, 'amount', 'status', '', 'date_created', '' )}*/}
                <div className="carContainer">
                  <li className="header">
                    <h3>order amount</h3>
                    <h3>order status</h3>
                  </li>
                  <div className="btnContainer">
                    <button className="btn">Edit</button>
                    <button className="btn">Delete</button>
                  </div>
                </div>

                <button
                    className="submitForm add"
                    type="submit"
                    onClick={() => {
                      changeShowFormOrder(!showFormOrder);
                    }}
                >
                  Add Order
                </button>
                <OrderForm show={showFormOrder} id={match.params.id} idCar={item._id}/>
              </ol>
            </div>

        );
      });
    }
  };

  return (
    <div>
      <div className="header">
        <h2 className="item">
          {customer === null
            ? null
            : `${customer[0].firstName} ${customer[0].lastName}`}
        </h2>
      </div>

      <p>Related cars:</p>
      <ol className="hideNum">
        <li key={customer === null ? null : customer[0]._id}>
          {customer === null || customer[0].cars.length === 0 ? (
            <h3>There are no cars</h3>
          ) : (
            <ol className="customerCard">
              {repeatedForm(
                "car",
                customer[0].cars,
                "make",
                "model",
                "year",
                "vin",
                "VinCode:"
              )}
            </ol>
          )}
        </li>

        <button
          className="submitForm add"
          type="submit"
          onClick={() => {
            changeShowForm(!showForm);
          }}
        >
          Add Car
        </button>
      </ol>

      <CarForm show={showForm} id={match.params.id}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    errors: state.customer.errors
  };
};

const mapDispatchToProps = {
  editCarOROrder,
  deleteCarOROrder
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OneCustomer)
);
