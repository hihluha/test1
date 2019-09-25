import React, { useState } from "react";
import connect from "react-redux/es/connect/connect";
import { checkErrors } from "../../utils/checkErrors";
import {
  saveCarOROrder,
  editCarOROrder
} from "../../actions/carAndOrderAction";

import "../Login/Login.css";

function OrderForm({
  showFormOrder,
  customerID,
  saveCarOROrder,
  idCar,
  changeShowFormOrder,
  showFormOrderId,
  changeShowFormOrderId,
  editCarOROrder
}) {
  const arr = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
  ];
  const nowDate = new Date();
  const today = nowDate.getDate();
  const nowMonth = arr[nowDate.getMonth()];
  const nowYear = nowDate.getFullYear();
  const fullDate = `${today} ${nowMonth} ${nowYear}`;

  const [customer, onChange] = useState({
    customerID,
    idCar,
    amount: showFormOrderId.amount !== "" ? showFormOrderId.amount : "",
    status: showFormOrderId.status !== "" ? showFormOrderId.status : "",
    date_created: fullDate
  });

  const [submit, setSubmit] = useState({
    amount: false,
    status: false
  });
  const [error, setError] = useState({
    amount: null,
    status: null
  });

  return (
    <div
      className={
        showFormOrderId.status !== "" || showFormOrder.status
          ? "logForm form"
          : "hide"
      }
    >
      <div className="logForm form">
        <div className="fields">
          <h2>Please, add order to related car</h2>
          <p className="errors">{error.amount !== "" ? error.amount : null}</p>
          <input
            className="inputFields"
            type="number"
            name="amount"
            value={customer.amount}
            placeholder="Enter order amount"
            onChange={e => {
              checkErrors(
                e,
                "amount",
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
            name="status"
            value={customer.status}
            placeholder="Enter order status"
            onChange={e => {
              checkErrors(
                e,
                "status",
                customer,
                setError,
                onChange,
                setSubmit,
                submit,
                error
              );
            }}
          />
          <label htmlFor="date">
            <h3 id="date">
              Order created at:
              {fullDate}
            </h3>
          </label>
          <button
            type="button"
            className="submitForm"
            onClick={() => {
              changeShowFormOrderId({
                ...showFormOrderId,
                status: "",
                amount: ""
              });
              changeShowFormOrder({
                ...showFormOrder,
                target: "",
                status: false
              });
              {
                showFormOrderId.status === ""
                  ? saveCarOROrder("order", customer)
                  : editCarOROrder("order", showFormOrder.target, customer);
              }
              onChange({
                ...customer,
                amount: "",
                status: "",
                date_created: fullDate
              });
              setSubmit({
                ...submit,
                amount: false,
                status: false,
                date_created: false
              });
              setError({
                ...error,
                amount: null,
                status: null,
                date_created: null
              });
            }}
          >
            {showFormOrderId.status === "" ? "Save order" : "Edit order"}
          </button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  saveCarOROrder,
  editCarOROrder
};

export default connect(
  null,
  mapDispatchToProps
)(OrderForm);
