import React, { useState } from 'react';
import connect from "react-redux/es/connect/connect";

import {checkErrors} from "../../utils/checkErrors";
import { saveCarOROrder } from "../../actions/carAndOrderAction";

import "../Login/Login.css";

function CarForm ({ show, saveCarOROrder, id }) {

    const [customer, onChange] = useState({
        id,
        makeCar: "",
        modelCar: "",
        yearCar: "",
        vinCar: ""
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
        <div className={ show ? "logForm form" : "hide"}>
            <div className="fields">
                <h2>Please, add car data</h2>
                <p className="errors">
                    {error.makeCar !== "" ? error.makeCar : null}
                </p>
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
                <p className="errors">
                    {error.yearCar !== "" ? error.yearCar : null}
                </p>
                <input
                    className="inputFields"
                    type="number"
                    name="yearCar"
                    value={customer.year}
                    placeholder="Enter car yearCar"
                    onChange={e => {
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
                <p className="errors">
                    {error.vinCar !== "" ? error.vinCar : null}
                </p>
                <input
                    className="inputFields"
                    type="number"
                    name="vinCar"
                    value={customer.vinCar}
                    placeholder="Enter car vin"
                    onChange={e => {
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
                    className= "submitForm"
                    // className={
                    //   Object.values(error).every(item => item === "")
                    //     ? "submitForm"
                    //     : "disableSubmit"
                    // }
                    type="button"
                    onClick={() => {
                        saveCarOROrder('car', customer);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    saveCarOROrder
};

export default connect(null, mapDispatchToProps)(CarForm);