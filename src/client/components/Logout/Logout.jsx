import React from "react";
import connect from 'react-redux/es/connect/connect';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { logoutUser } from "../../actions/authAction";

import "./Logout.css";

function LogOut({ history, logout }) {
    return (
        <div id="exitContainer">
            <div className="exitForm">
                <h3 className="exitTitle">Вы точно хотите выйти?</h3>
                <div id="foots">
                    <i className=" exitI fas fa-shoe-prints fa-lg" />
                    <i className="exitI fas fa-shoe-prints fa-2x" />
                    <i className="exitI fas fa-shoe-prints fa-3x" />
                </div>
                <div className="exitFooter">
                    <button
                        id="exitBtn"
                        className="exitFooterBtn"
                        type="button"
                        onClick={() => {
                                logout();
                                history.push("/");
                            }
                        }
                    >
                        Выйти
                    </button>
                    <button
                        id="cancelBtn"
                        className="exitFooterBtn"
                        type="button"
                        onClick={() => {
                            history.push("/customers");
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

LogOut.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    logout: PropTypes.func.isRequired
};

LogOut.defaultProps = {
    history: {}
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
    };
};

const mapDispatchToProps = {
    logout: logoutUser,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LogOut));