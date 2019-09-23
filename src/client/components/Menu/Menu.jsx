import React, { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";

import './Menu.css';

function Menu(props) {
    const [neededClass, showList] = useState("");
  return (
    <div
      id="reactMenu"
      style={
        location.pathname === "/"
          ? { display: "none" }
          : { position: "static" }
      }
    >
      <NavLink
        to="/customers"
        exact
        style={{ pointerEvents: "auto", padding: "20px", position: "relative" }}
        onClick={() => {
            showList(neededClass === "active" ? "" : "active");
        }}
      >
        Customers cards
      </NavLink>
      <NavLink
        to="/search"
        exact
        style={{ padding: "20px" }}
        onClick={() => showList("")}
      >
        Search
      </NavLink>
        <NavLink
            to="/create"
            exact
            style={{ padding: "20px" }}
            onClick={() => showList("")}
        >
            Add new customer
        </NavLink>
        <div className='authUserInfo'>
            <span>Hello, you're in</span>
            <img src= {'public/img/foto1.png'}  alt='You avatar' />

        </div>
        <NavLink
            to="/log_out"
            exact
            style={{ padding: "20px" }}
            onClick={() => showList("")}
        >
            Log out
        </NavLink>
    </div>
  );
}

export default withRouter(Menu);
