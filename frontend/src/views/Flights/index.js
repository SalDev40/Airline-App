// @ts-nocheck
/* eslint-disable max-len */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, makeStyles } from "@material-ui/core";

import FlightsTable from "./FlightsTable";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Flights(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Container maxWidth={false}>
      <FlightsTable />
    </Container>
  );
}

export default Flights;
