import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("userToken");
  console.log("private route",token)
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
