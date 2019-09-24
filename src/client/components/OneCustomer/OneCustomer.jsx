import React, { useState, useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";

import {
  editCarOROrder,
  deleteCarOROrder,
  getOrders
} from "../../actions/carAndOrderAction";

import CarForm from "../CarForm/CarForm";
import OrderForm from "../CarForm/OrderForm";

import "./OneCustomer.css";

function OneCustomer({
  location,
  history,
  match,
  customer,
  cars,
  orders,
  getOrders,
  editCarOROrder,
  deleteCarOROrder
}) {

  const [showForm, changeShowForm] = useState(false);
  const [showFormOrder, changeShowFormOrder] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const carForm = cars !== null ? cars.map(car => {

    const ordersForCar = orders !== null ? orders.map((order) => {

      if(car._id === order.cars) {

        return ( <ol className="customerCard">
          <div className="carContainer">
            <li className="header">
              <h3>{order.amount}</h3>
              <h3>{order.status}</h3>
              <h3>{order.date_created}</h3>
            </li>
            <div className="btnContainer">
              <button className="btn">Edit</button>
              <button className="btn">Delete</button>
            </div>
          </div>
          <OrderForm
              show={showFormOrder}
              changeShowFormOrder={changeShowFormOrder}
              customerID={match.params.id}
              idCar={car._id}
          />
        </ol>)
      } }) : "There are no orders";

        if(customer[0]._id === car.customer) {

          return (
              <div className="customerCard">
                <div className="carContainer">
                  <li className="header" key={car._id}>
                    <h3>{`${car.make} ${car.model}, ${car.year}`}</h3>
                    <h3>
                      "VinCode:" {car.vin}
                    </h3>
                  </li>
                  <div className="btnContainer">
                    <button
                        className="btn"
                        onClick={() => {
                          editCarOROrder(name, car._id);
                        }}
                    >
                      Edit
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                          deleteCarOROrder(name, car._id);
                        }}
                    >
                      Delete
                    </button>
                  </div>

                </div>
                {ordersForCar}
                <button
                    className="submitForm add"
                    type="submit"
                    onClick={() => {
                      changeShowFormOrder(!showFormOrder);
                    }}
                >
                  Add Order
                </button>
              </div>
          );
        }}) : "There are no cars";

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
          {cars === null || cars.length === 0 ? (
            <h3>There are no cars</h3>
          ) : (
            <ol className="customerCard">
              {carForm}
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

      <CarForm
        show={showForm}
        changeShowForm={changeShowForm}
        customerID={match.params.id}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    errors: state.customer.errors,
    cars: state.carAndOrder.cars,
    orders: state.carAndOrder.orders
  };
};

const mapDispatchToProps = {
  editCarOROrder,
  deleteCarOROrder,
  getOrders
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OneCustomer)
);
