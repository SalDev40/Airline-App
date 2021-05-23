// @ts-nocheck
/* eslint-disable max-len */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import {
  TextField,
  Box,
  Button,
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Divider,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  CardContent,
  Container,
} from "@material-ui/core";

import { storeBookingDetails } from "../../redux/actions/TransactionAction";

toast.configure({
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const useStyles = makeStyles((theme) => ({
  root: {},

  formControl: {
    minWidth: 160,
  },
  formControl2: {
    width: "100%",
  },
}));

function BookForm(props) {
  const classes = useStyles();
  const [type, setType] = React.useState("round_trip");
  const [fromAirport, setFromAirport] = React.useState();
  const [toAirport, setToAirport] = React.useState();
  const [deptDate, setDeptDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();
  const [numAdults, setNumAdults] = React.useState();
  const [numChildren, setNumChildren] = React.useState();
  const [errorNumAdults, setErrorNumAdults] = React.useState();
  const [errorNumChildren, setErrorNumChildren] = React.useState();
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {}, []);

  return (
    <Container maxWidth="md">
      <Card
        style={{
          margin: "auto",
          marginTop: "10vh",
          padding: 20,
          backgroundColor: "lightgrey",
          border: "2px solid black",
        }}
      >
        <CardHeader
          className={classes.cardHeader}
          title="SELECT FLIGHT"
          action={
            <FormControl component="fieldset">
              <RadioGroup
                value={type}
                style={{
                  display: "block",
                }}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <FormControlLabel
                  value="round_trip"
                  control={<Radio />}
                  label="Round Trip"
                />
                <FormControlLabel
                  value="one_way"
                  control={<Radio />}
                  label="One Way"
                />
              </RadioGroup>
            </FormControl>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                select
                label="From"
                name="fromAirport"
                fullWidth
                type="text"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                onChange={(event) => {
                  setFromAirport(event.target.value);
                }}
                error={!fromAirport ? true : false}
                helperText={!fromAirport ? "please select" : null}
                value={fromAirport}
              >
                {[" ", "HOU", "JFK", "LAX", "MIA", "ORD"].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={type == "one_way" ? true : false}
                select
                label="To"
                name="toAirport"
                fullWidth
                type="text"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                error={type == "round_trip" && !toAirport ? true : false}
                helperText={
                  type == "round_trip" && !toAirport ? "please select" : null
                }
                onChange={(event) => {
                  setToAirport(event.target.value);
                }}
                value={toAirport}
              >
                {[" ", "HOU", "JFK", "LAX", "MIA", "ORD"].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box p={2} />
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Departure"
                type="date"
                fullWidth
                variant="outlined"
                onChange={(event) => {
                  setDeptDate(event.target.value);
                }}
                value={deptDate}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: deptDate }}
                disabled={type == "one_way" ? true : false}
                label="Return"
                type="date"
                fullWidth
                variant="outlined"
                onChange={(event) => {
                  setReturnDate(event.target.value);
                }}
                value={returnDate}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Adults"
                type="number"
                fullWidth
                error={
                  numAdults < 0 ||
                  !numAdults ||
                  (numAdults == 0 && numChildren == 0)
                    ? true
                    : false
                }
                helperText={
                  numAdults < 0
                    ? "cant be negative"
                    : !numAdults
                    ? "please enter"
                    : numAdults == 0 && numChildren == 0
                    ? "min 1 passenger"
                    : null
                }
                variant="outlined"
                onChange={(event) => {
                  setNumAdults(event.target.value);
                  if (event.target.value < 0) setErrorNumAdults(true);
                  else setErrorNumAdults(false);
                }}
                value={numAdults}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Children"
                type="number"
                fullWidth
                variant="outlined"
                error={
                  numChildren < 0 ||
                  !numChildren ||
                  (numAdults == 0 && numChildren == 0)
                    ? true
                    : false
                }
                helperText={
                  numChildren < 0
                    ? "cant be negative"
                    : !numChildren
                    ? "please enter"
                    : numAdults == 0 && numChildren == 0
                    ? "min 1 passenger"
                    : null
                }
                onChange={(event) => {
                  setNumChildren(event.target.value);
                  if (event.target.value < 0) setErrorNumChildren(true);
                  else setErrorNumChildren(false);
                }}
                value={numChildren}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                disabled={
                  errorNumAdults ||
                  errorNumChildren ||
                  !numChildren ||
                  !numAdults ||
                  numAdults + numChildren == 0 ||
                  !type ||
                  !fromAirport ||
                  (type == "round_trip" && !toAirport)
                    ? true
                    : false
                }
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => {
                  console.log("children: ", numChildren);
                  console.log("adults: ", numAdults);
                  console.log("depDate: ", deptDate);
                  console.log("arrDate: ", returnDate);
                  console.log("fromAirport: ", fromAirport);
                  console.log("toAirport: ", toAirport);
                  console.log("type: ", type);

                  //make request to backend
                  axios
                    .get("http://localhost:5000/book/bookRef")
                    .then((res) => {
                      console.log(res);
                      //save current booking details in redux
                      dispatch(
                        storeBookingDetails({
                          type: type,
                          fromAirport: fromAirport,
                          toAirport: toAirport,
                          deptDate: deptDate,
                          returnDate: returnDate,
                          numAdults: numAdults,
                          numChildren: numChildren,
                          bookRef: res.data.bookRef,
                        })
                      );
                      history.push("/app/flights");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BookForm;
