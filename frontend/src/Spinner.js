import React, { Fragment } from "react";
import spinner from "./spinner.gif";
import "./Spinner.css";
export default () => (
  <Fragment>
    <img className="spinner" src={spinner} alt="Loading..." />
  </Fragment>
);
