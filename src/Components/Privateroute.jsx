import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoutes = ({ isLoggedIn, children }) => {
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default PrivateRoutes;