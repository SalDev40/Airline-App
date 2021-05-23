import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function AuthGuard({ component: Component, render, ...rest }) {
  const account = useSelector((state) => state.auth);

  if (!account.user) {
    return <Redirect to="/login" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

export default AuthGuard;
