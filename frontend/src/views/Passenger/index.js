// @ts-nocheck
/* eslint-disable max-len */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, makeStyles, Button, Container } from "@material-ui/core";

import PassengerForm from "./PassengerForm";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Passenger(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [profileData, setProfileData] = React.useState({});
  const [fuelQuoteData, setFuelQuoteData] = React.useState({});

  return (
    <Container maxWidth="xl">
      <PassengerForm />
    </Container>
  );
}

export default Passenger;
