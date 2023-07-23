import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";

export function PrivateRoute({ children }) {
  const { isLogin } = useContext(AuthContext);
//   const location = useLocation();
  return isLogin ? children : <Navigate to="/login"/>;
}
