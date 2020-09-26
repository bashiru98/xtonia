import React from "react";
import { Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return userInfo ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
};

export default PrivateRoute;
