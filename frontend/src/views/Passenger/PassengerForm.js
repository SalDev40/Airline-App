// @ts-nocheck
/* eslint-disable max-len */
import React from "react";
import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  TextField,
  Typography,
  Link,
  Box,
  Button,
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Modal,
} from "@material-ui/core";

import { states } from "../../constants/index";
import { storePassengersInfo } from "../../redux/actions/TransactionAction";
import Seats from "../Seats/Seats";
import Bagging from "../Bagging/Bagging";
toast.configure({
  autoClose: 3000,
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
  cardHeader: {
    textAlign: "center",
  },
}));

function PassengerForm(props) {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);
  const history = useHistory();

  const dispatch = useDispatch();
  const [numPassengers, setNumpassengers] = React.useState(
    Number(reduxTransaction.booking.numAdults) +
      Number(reduxTransaction.booking.numChildren)
  );
  const [passengerList, setPassengerList] = React.useState([]);
  const [openSeatsModal, setOpenSeatsModal] = React.useState();
  const [openBaggingModal, setOpenBaggingModal] = React.useState();
  const [passengerNumSeatBook, setPassengerNumSeatBook] = React.useState();

  React.useEffect(() => {
    let tempArray = [];
    for (let index = 0; index < numPassengers; index++) {
      tempArray.push({
        passengerNum: index,
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        Id: null,
        country: null,
        email: null,
        phone: null,
        seatGoing: {},
        seatReturning: {},
        bagging: {},
      });
    }
    setPassengerList(tempArray);
    console.log(tempArray);
  }, []);

  return (
    <Grid
      container
      style={{
        marginTop: 10,
      }}
      spacing={1}
      justify="center"
    >
      <Grid container item xs={12}>
        <Grid container item justify="flex-start" xs={6}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              history.push("/app/flights");
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item container item justify="flex-end" xs={6}>
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              dispatch(storePassengersInfo(passengerList));
              history.push("/app/checkout");
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={1} justify="center" item xs={12}>
        {passengerList.length > 0 ? (
          passengerList.map((passenger) => {
            return (
              <Grid item xs={4}>
                <Card
                  style={{
                    border: "2px solid black",
                    backgroundColor: "lightgrey",
                  }}
                >
                  <CardHeader
                    className={classes.cardHeader}
                    title={`Passenger ${
                      Number(passenger.passengerNum) + 1
                    } Info`}
                  />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="First Name"
                          name="first_name"
                          fullWidth
                          type="text"
                          variant="outlined"
                          value={passenger.firstName}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].firstName =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Last Name"
                          name="last_name"
                          fullWidth
                          type="text"
                          variant="outlined"
                          value={passenger.lastName}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].lastName =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Box p={1} />
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Address"
                          name="address"
                          fullWidth
                          type="text"
                          variant="outlined"
                          value={passenger.address}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].address =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Box p={1} />
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="City"
                          name="city"
                          fullWidth
                          type="text"
                          variant="outlined"
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].city =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.city}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Zip"
                          name="zip"
                          fullWidth
                          type="text"
                          variant="outlined"
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].zip =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.zip}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          select
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="State"
                          variant="outlined"
                          className={classes.formControl2}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].state =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.state}
                        >
                          {states.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Box p={1} />
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <TextField
                          select
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Country"
                          variant="outlined"
                          className={classes.formControl2}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].country =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.country}
                        >
                          {[" ", "USA", "MX", "CD"].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Passport/License Number"
                          variant="outlined"
                          className={classes.formControl2}
                          SelectProps={{
                            native: true,
                          }}
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].passLicenseNo =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.passLicenseNo}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Box p={1} />
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Email"
                          name="email"
                          fullWidth
                          type="text"
                          variant="outlined"
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].email =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.email}
                        />
                      </Grid>
                      <Grid item xs>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Phone"
                          name="phone"
                          fullWidth
                          type="text"
                          variant="outlined"
                          onChange={(event) => {
                            let temp = passengerList.slice();
                            temp[passenger.passengerNum].phone =
                              event.target.value;
                            setPassengerList(temp);
                          }}
                          value={passenger.phone}
                        />
                      </Grid>
                    </Grid>
                    <Box p={1} />
                    <Grid container spacing={1}>
                      <Grid item xs>
                        <Button
                          fullWidth
                          style={{
                            color: "blue",
                            fontStyle: "italic",
                            fontSize: 12,
                          }}
                          onClick={() => {
                            setPassengerNumSeatBook(passenger.passengerNum);
                            setOpenSeatsModal(true);
                          }}
                          size="small"
                        >
                          Select Seat (optional)
                        </Button>
                      </Grid>
                      <Grid item xs>
                        <Button
                          fullWidth
                          style={{
                            color: "blue",
                            fontStyle: "italic",
                            fontSize: 12,
                          }}
                          onClick={() => {
                            setPassengerNumSeatBook(passenger.passengerNum);
                            setOpenBaggingModal(true);
                          }}
                          size="small"
                        >
                          Select Bagging (optional)
                        </Button>
                      </Grid>
                    </Grid>
                    <Modal
                      style={{
                        backgroundColor: "lightyellow",
                        border: "2px solid black",
                        margin: "auto",
                        height: "75vh",
                        width: "60%",
                        overflow: "auto",
                      }}
                      open={openSeatsModal}
                      onClose={() => {
                        setOpenSeatsModal(false);
                      }}
                    >
                      <Seats
                        closeSeatsModal={() => {
                          setOpenSeatsModal(false);
                        }}
                        setPassengerListSeat={(
                          chosenSeatGoing,
                          chosenSeatReturning
                        ) => {
                          console.log(passengerNumSeatBook);
                          let temp = passengerList.slice();
                          temp[
                            passengerNumSeatBook
                          ].seatGoing = chosenSeatGoing;
                          temp[
                            passengerNumSeatBook
                          ].seatReturning = chosenSeatReturning;
                          setPassengerList(temp);
                          console.log(temp);
                        }}
                      />
                    </Modal>
                    <Modal
                      style={{
                        backgroundColor: "lightgrey",
                        border: "5px solid black",
                        margin: "auto",
                        height: "40vh",
                        width: "50%",
                        overflow: "auto",
                      }}
                      open={openBaggingModal}
                      onClose={() => {
                        setOpenBaggingModal(false);
                      }}
                    >
                      <Bagging
                        closeBaggingModal={() => {
                          setOpenBaggingModal(false);
                        }}
                        setPassengerListBagging={(chosenBags) => {
                          console.log(passengerNumSeatBook);
                          let temp = passengerList.slice();
                          temp[passengerNumSeatBook].bagging = chosenBags;
                          setPassengerList(temp);
                          console.log(temp);
                        }}
                      />
                    </Modal>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs>
            <h1></h1>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default PassengerForm;
