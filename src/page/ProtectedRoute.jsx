import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("myToken");

  if (!token) {
    alert('You need to Login First')
    return <Navigate to="/login" />;
  } else {
    return <Component {...rest} />;
  }
};

export default ProtectedRoute;
