import React, { useState, useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";

import {
  deleteCarOROrder,
  getOrders,
  getCars
} from "../../actions/carAndOrderAction";

import CarForm from "../CarForm/CarForm";
import OrderForm from "../CarForm/OrderForm";

import "./OneCustomer.css";

function OneCustomer({
  match,
  customer,
  cars,
  getCars,
  orders,
  getOrders,
  deleteCarOROrder,
  isEditedCar,
  isDeletedCar,
  isEditedOrder,
  isDeletedOrder
}) {
  const [showFormOrder, changeShowFormOrder] = useState({
    target: "",
    status: false
  });
  const [showFormOrderId, changeShowFormOrderId] = useState({
    status: "",
    amount: ""
  });
  const [showFormCar, changeShowFormCar] = useState({
    target: "",
    status: false
  });
  const [showFormCarId, changeShowFormCarId] = useState({
    make: "",
    model: "",
    year: "",
    vin: ""
  });

  useEffect(() => {
    getOrders();
    getCars();
  }, [isEditedCar, isDeletedCar, isEditedOrder, isDeletedOrder]);

  const carForm =
    cars !== null
      ? cars.map(car => {
          const ordersForCar =
            orders !== null
              ? orders.map(order => {
                  if (car._id === order.cars) {
                    return (
                      <ol className="customerCard">
                        {showFormOrder.target !== order._id ? (
                          <div className="carContainer">
                            <li className="header">
                              <h3>{order.amount}</h3>
                              <h3>{order.status}</h3>
                              <h3>{order.date_created}</h3>
                            </li>
                            <div className="btnContainer">
                              <button
                                className="btn"
                                onClick={() => {
                                  changeShowFormOrder({
                                    ...showFormOrder,
                                    target: order._id,
                                    status: true
                                  });
                                  changeShowFormOrderId({
                                    ...showFormOrderId,
                                    status: order.status,
                                    amount: order.amount
                                  });
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn"
                                onClick={() => {
                                  deleteCarOROrder("order", order._id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <OrderForm
                            showFormOrderId={showFormOrderId}
                            changeShowFormOrderId={changeShowFormOrderId}
                            showFormOrder={showFormOrder}
                            changeShowFormOrder={changeShowFormOrder}
                            customerID={match.params.id}
                            idCar={car._id}
                          />
                        )}
                      </ol>
                    );
                  }
                })
              : "There are no orders";

          if (customer !== null && customer[0]._id === car.customer) {
            return (
              <div className="customerCard">
                {showFormCar.target !== car._id ? (
                  <div className="carContainer">
                    <li className="header" key={car._id}>
                      <h3>{`${car.make} ${car.model}, ${car.year}`}</h3>
                      <h3>"VinCode:" {car.vin}</h3>
                    </li>
                    <div className="btnContainer">
                      <button
                        className="btn"
                        onClick={() => {
                          changeShowFormCar({
                            ...showFormCar,
                            target: car._id,
                            status: true
                          });
                          changeShowFormCarId({
                            ...showFormCarId,
                            make: car.make,
                            model: car.model,
                            year: car.year,
                            vin: car.vin
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className={"btn"}
                        onClick={() => {
                          deleteCarOROrder("car", car._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <CarForm
                    showFormCarId={showFormCarId}
                    changeShowFormCarId={changeShowFormCarId}
                    showFormCar={showFormCar}
                    changeShowFormCar={changeShowFormCar}
                    customerID={match.params.id}
                  />
                )}
                {ordersForCar}
                {showFormOrder.target === car._id ? (
                  <OrderForm
                    showFormOrderId={showFormOrderId}
                    changeShowFormOrderId={changeShowFormOrderId}
                    showFormOrder={showFormOrder}
                    changeShowFormOrder={changeShowFormOrder}
                    customerID={match.params.id}
                    idCar={car._id}
                  />
                ) : null}
                <button
                  className="submitForm add"
                  type="submit"
                  onClick={() => {
                    {
                      !showFormOrder.status
                        ? changeShowFormOrder({
                            ...showFormOrder,
                            target: car._id,
                            status: true
                          })
                        : changeShowFormOrder({
                            ...showFormOrder,
                            target: "",
                            status: false
                          });
                    }
                  }}
                >
                  Add Order
                </button>
              </div>
            );
          }
        })
      : "There are no cars";

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
            <ol className="customerCard">{carForm}</ol>
          )}
        </li>
        {showFormCar.target === "new" ? (
          <CarForm
            showFormCarId={showFormCarId}
            changeShowFormCarId={changeShowFormCarId}
            showFormCar={showFormCar}
            changeShowFormCar={changeShowFormCar}
            customerID={match.params.id}
          />
        ) : null}

        <button
          className="submitForm add"
          type="submit"
          onClick={() => {
            {
              !showFormCar.status
                ? changeShowFormCar({
                    ...showFormCar,
                    target: "new",
                    status: true
                  })
                : changeShowFormCar({
                    ...showFormCar,
                    target: "",
                    status: false
                  });
            }
          }}
        >
          Add Car
        </button>
      </ol>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    errors: state.customer.errors,
    cars: state.carAndOrder.cars,
    orders: state.carAndOrder.orders,
    isEditedCar: state.carAndOrder.isEditedCar,
    isEditedOrder: state.carAndOrder.isEditedOrder,
    isDeletedCar: state.carAndOrder.isDeletedCar,
    isDeletedOrder: state.carAndOrder.isDeletedOrder
  };
};

const mapDispatchToProps = {
  deleteCarOROrder,
  getOrders,
  getCars
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OneCustomer)
);
