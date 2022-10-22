import React from "react";
import { Link, Outlet } from "react-router-dom";

import DarkmodeIcon from "../../assets/icons/darkmode.png";

import "./styles.scss";

export const PageLayout = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <h2>Where in the world</h2>
        </Link>
        <button>
          <img src={DarkmodeIcon} alt="" />
          <h4>Dark Mode</h4>
        </button>
      </div>
      <Outlet />
    </>
  );
};
