import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useUser } from "../context/AuthContext";

const Protected = (props: React.PropsWithChildren) => {
  const { user } = useUser();

  if (!user.isLoggedin) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return <>{props.children}</>;
};

export default Protected;
