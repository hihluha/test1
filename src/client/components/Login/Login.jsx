import React, { useState, useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter, NavLink } from "react-router-dom";

import { checkErrors } from "../../utils/checkErrors";
import { loginUser } from "../../actions/authAction";

import "./Login.css";

function LogIn(props) {

    const [customer, onChange] = useState({
        email: "",
        password: "",
        password2: ""
    });
    const [submit, setSubmit] = useState({
        email: false,
        password: false
    });
    const [error, setError] = useState({
        email: null,
        password: null,
        password2: null
    });

    const {
        loginUser,
        isAuth,
        history,
        errors
    } = props;

    const InputPassword = React.createRef();
    const InputPassword2 = React.createRef();

    return (
        <form
            className="containerLog blockAll"
            onSubmit={e => {
                e.preventDefault();

                    const newLogUser = {
                        email: customer.email,
                        password: customer.password
                    };
                if (newLogUser.password !== customer.password2) {
                    setError({...error, password2: "Пароли не совпадают"});
                } else {
                    loginUser(newLogUser, history);
                    onChange({ ...customer, email: "", password: "", password2: "" });
                    setSubmit({...submit, email: false, password: false });
                    setError({...error, email: null, password: null, password2: null });
                }

            }}
        >
            <div className="logForm">

                <div className="fields">
                    <p className="errors">{error.email !== "" ? error.email : null}</p>
                    <p className={errors === null ? "errorsNo" : " errors"}>{errors}</p>
                    <input
                        className="inputFields"
                        type="text"
                        name="email"
                        value= {customer.email}
                        placeholder="Введите email"
                        onChange={e => {
                            checkErrors(e, 'email', customer, setError, onChange, setSubmit, submit, error);
                        }}
                    />
                    <i className="fas fa-envelope-open-text fa-lg" />

                    <i className=" fas fa-key fa-lg notDisplay" />
                    <p className="errors">
                        {error.password !== "" ? error.password : null}
                    </p>
                    <input
                        className="inputFields"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        ref={InputPassword}
                        value={ customer.password }
                        onChange={e => {
                            checkErrors(e, 'password', customer, setError, onChange, setSubmit, submit, error);
                        }}
                    />
                    <i className="fas fa-key fa-lg" />
                    <i
                        className="fas fa-eye fa-lg eye"
                        onClick={() => {
                            if (InputPassword.current.type === "password") {
                                InputPassword.current.type = "text";
                            } else {
                                InputPassword.current.type = "password";
                            }
                        }}
                    />

                    {/* passwodr2 */}

                    <p className="errors" >
                        {error.password2 !== "" ? error.password2 : null}
                    </p>
                    <input
                        className="inputFields"
                        type="password"
                        name="password2"
                        placeholder="Подтвердите пароль"
                        ref={InputPassword2}
                        value= { customer.password2 }
                        onChange={e => {
                            checkErrors(e, 'password2', customer, setError, onChange, setSubmit, submit, error);
                        }}
                    />

                    <i
                        className=" fas fa-key fa-lg" />
                    <i
                        className=" fas fa-eye fa-lg eye"
                        onClick={() => {
                            if (InputPassword2.current.type === "password") {
                                InputPassword2.current.type = "text";
                            } else {
                                InputPassword2.current.type = "password";
                            }
                        }}
                    />
                </div>

                <button
                    className={
                        Object.values(error).every(item => item === "")
                            ? "submitForm"
                            : "disableSubmit"
                    }
                    type="submit"
                >
                     Войти
                    {/*{isAuth ? history.push("/main") : null}*/}
                </button>
                <NavLink className='forgotPassword' to='#'>Забыли пароль?</NavLink>
            </div>

        </form>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        errors: state.auth.errors
    };
};

const mapDispatchToProps = {
    loginUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));