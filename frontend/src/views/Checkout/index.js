// @ts-nocheck
/* eslint-disable max-len */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles, Container } from "@material-ui/core";

import CheckoutForm from "./CheckoutForm";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Checkout(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Container maxWidth="false" >
      <CheckoutForm />
    </Container>
  );
}

export default Checkout;
