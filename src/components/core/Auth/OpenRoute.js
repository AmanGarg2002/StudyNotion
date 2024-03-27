//Prevent the auth user from going to normal routes because they are logged in

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile"></Navigate>;
  }
};

export default OpenRoute;
