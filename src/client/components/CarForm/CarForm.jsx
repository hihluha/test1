import React, { useState } from "react";
import connect from "react-redux/es/connect/connect";

import { checkErrors } from "../../utils/checkErrors";
import {
  saveCarOROrder,
  editCarOROrder
} from "../../actions/carAndOrderAction";

import "../Login/Login.css";

function CarForm({
  showFormCar,
  changeShowFormCar,
  showFormCarId,
  changeShowFormCarId,
  editCarOROrder,
  saveCarOROrder,
  customerID
}) {
  const [customer, onChange] = useState({
    customerID,
    makeCar: showFormCarId.make !== "" ? showFormCarId.make : "",
    modelCar: showFormCarId.model !== "" ? showFormCarId.model : "",
    yearCar: showFormCarId.year !== "" ? showFormCarId.year : "",
    vinCar: showFormCarId.vin !== "" ? showFormCarId.vin : ""
  });

  const [submit, setSubmit] = useState({
    makeCar: false,
    modelCar: false,
    yearCar: false,
    vinCar: false
  });
  const [error, setError] = useState({
    makeCar: null,
    modelCar: null,
    yearCar: null,
    vinCar: null
  });

  return (
    <div
      className={
        showFormCarId.make !== "" || showFormCar.status
          ? "logForm form"
          : "hide"
      }
    >
      <div className="fields">
        <h2>Please, add car data</h2>
        <p className="errors">{error.makeCar !== "" ? error.makeCar : null}</p>
        <input
          className="inputFields"
          type="text"
          name="makeCar"
          value={customer.makeCar}
          placeholder="Enter car make"
          onChange={e => {
            checkErrors(
              e,
              "makeCar",
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
          {error.modelCar !== "" ? error.modelCar : null}
        </p>
        <input
          className="inputFields"
          type="text"
          name="modelCar"
          value={customer.modelCar}
          placeholder="Enter car model"
          onChange={e => {
            checkErrors(
              e,
              "modelCar",
              customer,
              setError,
              onChange,
              setSubmit,
              submit,
              error
            );
          }}
        />
        <p className="errors">{error.yearCar !== "" ? error.yearCar : null}</p>
        <input
          className="inputFields"
          type="number"
          name="yearCar"
          value={customer.yearCar}
          pattern="/^-?\d+\.?\d*$/"
          placeholder="Enter car yearCar"
          onChange={e => {
            e.target.value = e.target.value.replace(/^[0-9]{5}$/, "");
            checkErrors(
              e,
              "yearCar",
              customer,
              setError,
              onChange,
              setSubmit,
              submit,
              error
            );
          }}
        />
        <p className="errors">{error.vinCar !== "" ? error.vinCar : null}</p>
        <input
          className="inputFields"
          type="number"
          name="vinCar"
          pattern="/^-?\d+\.?\d*$/"
          value={customer.vinCar}
          placeholder="Enter car vin"
          onChange={e => {
            e.target.value = e.target.value.replace(/^[0-9]{16}$/, "");
            checkErrors(
              e,
              "vinCar",
              customer,
              setError,
              onChange,
              setSubmit,
              submit,
              error
            );
          }}
        />
        <button
          className="submitForm"
          // className={
          //   Object.values(error).every(item => item === "")
          //     ? "submitForm"
          //     : "disableSubmit"
          // }
          type="button"
          onClick={() => {
            changeShowFormCarId({
              ...showFormCarId,
              make: "",
              model: "",
              year: "",
              vin: ""
            });
            changeShowFormCar({
              ...showFormCar,
              target: "",
              status: false
            });
            {
              showFormCar.target === "new"
                ? saveCarOROrder("car", customer)
                : editCarOROrder("car", showFormCar.target, customer);
            }
            onChange({
              ...customer,
              makeCar: "",
              modelCar: "",
              yearCar: "",
              vinCar: ""
            });
            setSubmit({
              ...submit,
              makeCar: false,
              modelCar: false,
              yearCar: false,
              vinCar: false
            });
            setError({
              ...error,
              makeCar: null,
              modelCar: null,
              yearCar: null,
              vinCar: null
            });
          }}
        >
          {showFormCar.target === "new" ? "Save" : "Edit car"}
        </button>
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
)(CarForm);
