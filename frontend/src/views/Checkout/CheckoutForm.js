// @ts-nocheck
/* eslint-disable max-len */
import React from "react";
import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  TextField,
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  makeStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  OutlinedInput,
} from "@material-ui/core";

import { states } from "../../constants/index";
import {
  storeCustomersInfo,
  storeReceiptInfo,
} from "../../redux/actions/TransactionAction";

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

function CheckoutForm(props) {
  const classes = useStyles();

  const reduxTransaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const [nameOnCard, setNameOnCard] = React.useState();
  const [cardNumber, setCardNumber] = React.useState();
  const [expDate, setExpDate] = React.useState();
  const [securityCode, setSecurityCode] = React.useState();

  const [firstName, setFirstname] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [address, setAddress] = React.useState();
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();
  const [zip, setZip] = React.useState();
  const [country, setCountry] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  const [promoCode, setPromoCode] = React.useState();
  const [taxes, setTaxes] = React.useState();
  const [total, setTotal] = React.useState({});

  const [openModal, setOpenModal] = React.useState();

  const history = useHistory();

  React.useEffect(() => {}, []);

  return (
    <Grid
      container
      style={{
        marginTop: 10,
      }}
      spacing={1}
      alignItems="center"
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
              history.push("/app/passenger");
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item container justify="flex-end" xs={6}>
          <Button
            disabled={
              !nameOnCard ||
              !cardNumber ||
              !expDate ||
              !securityCode ||
              !firstName ||
              !lastName ||
              !address ||
              !city ||
              !state ||
              !zip ||
              !country ||
              !email ||
              !phone
            }
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={() => {
              dispatch(
                storeCustomersInfo({
                  nameOnCard: nameOnCard,
                  cardNumber: cardNumber,
                  expDate: expDate,
                  securityCode: securityCode,
                  firstName: firstName,
                  lastName: lastName,
                  address: address,
                  city: city,
                  state: state,
                  zip: zip,
                  country: country,
                  email: email,
                  phone: phone,
                  promo: promoCode,
                })
              );

              axios
                .post("http://localhost:5000/checkout/total", {
                  bookingType: reduxTransaction.booking.type,
                  numAdults: reduxTransaction.booking.numAdults,
                  numChildren: reduxTransaction.booking.numChildren,
                  goingFlight:
                    reduxTransaction.selectedFlights.goingFlight.flight_id,
                  returnFlight: reduxTransaction.selectedFlights.returningFlight
                    ? reduxTransaction.selectedFlights.returningFlight.flight_id
                    : null,
                  passengers: reduxTransaction.passengersInfo,
                  promo: promoCode,
                })
                .then((res) => {
                  console.log(res.data.total);
                  setTotal(res.data.total);
                  setOpenModal(true);
                })
                .catch((err) => console.log(err));
            }}
          >
            Complete
          </Button>
        </Grid>
      </Grid>
      {/* FORMS */}
      <Box p={5} />
      <Grid container spacing={1} item xs={12}>
        <Grid item md={7} xs={12}>
          <Card
            style={{
              backgroundColor: "lightgrey",
              border: "2px solid black",
            }}
          >
            <CardHeader className={classes.cardHeader} title="Customer Info" />
            <Divider />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!firstName ? true : false}
                    helperText={
                      !firstName ? "please enter a first name" : false
                    }
                    label="First Name"
                    name="first_name"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={firstName}
                    onChange={(event) => {
                      setFirstname(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!lastName ? true : false}
                    helperText={!lastName ? "please enter a last name" : false}
                    label="Last Name"
                    name="last_name"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
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
                    error={!address ? true : false}
                    helperText={!address ? "please enter a address" : false}
                    label="Address"
                    name="address"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!city ? true : false}
                    helperText={!city ? "please enter a city" : false}
                    label="City"
                    name="city"
                    fullWidth
                    type="text"
                    variant="outlined"
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    value={city}
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
                    error={!zip ? true : false}
                    helperText={!zip ? "please enter a zip" : false}
                    label="Zip"
                    name="zip"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={zip}
                    onChange={(event) => {
                      setZip(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!state ? true : false}
                    helperText={!state ? "please enter a state" : false}
                    label="State"
                    variant="outlined"
                    className={classes.formControl2}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={(event) => {
                      setState(event.target.value);
                    }}
                    value={state}
                  >
                    {states.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs>
                  <TextField
                    select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!country ? true : false}
                    helperText={!country ? "please enter a country" : false}
                    label="Country"
                    variant="outlined"
                    className={classes.formControl2}
                    SelectProps={{
                      native: true,
                    }}
                    value={country}
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  >
                    {[" ", "USA", "MX", "CD"].map((option) => (
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!email ? true : false}
                    helperText={!email ? "please enter a email" : false}
                    label="Email"
                    name="email"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!phone ? true : false}
                    helperText={!phone ? "please enter a phone" : false}
                    label="Phone"
                    name="phone"
                    fullWidth
                    type="text"
                    variant="outlined"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* *************************************/}
        {/* *******************PAYMENT***********/}
        {/* *************************************/}

        <Grid container spacing={1} item md={5} xs={12}>
          <Grid item xs={12}>
            <Card
              style={{
                backgroundColor: "lightgrey",
                border: "2px solid black",
              }}
            >
              <CardHeader className={classes.cardHeader} title="Card Details" />
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!nameOnCard ? true : false}
                      helperText={
                        !nameOnCard ? "please enter cardholder name" : false
                      }
                      label="Name On Card"
                      name="name_on_card"
                      fullWidth
                      type="text"
                      variant="outlined"
                      value={nameOnCard}
                      onChange={(event) => {
                        setNameOnCard(event.target.value);
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
                      error={!cardNumber ? true : false}
                      helperText={
                        !cardNumber ? "please enter card number" : false
                      }
                      label="Card Number"
                      name="card_number"
                      fullWidth
                      type="text"
                      variant="outlined"
                      value={cardNumber}
                      onChange={(event) => {
                        setCardNumber(event.target.value);
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
                      error={!expDate ? true : false}
                      helperText={!expDate ? "please enter exp date" : false}
                      label="Exp Date"
                      name="exp_date"
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={expDate}
                      onChange={(event) => {
                        setExpDate(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!securityCode ? true : false}
                      helperText={!securityCode ? "please enter a cvv" : false}
                      label="Security Code"
                      variant="outlined"
                      className={classes.formControl2}
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(event) => {
                        setSecurityCode(event.target.value);
                      }}
                      value={securityCode}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              style={{
                backgroundColor: "lightgrey",
                border: "2px solid black",
              }}
            >
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label="Promo Code"
                      name="promo_code"
                      fullWidth
                      type="text"
                      variant="outlined"
                      value={promoCode}
                      onChange={(event) => {
                        setPromoCode(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        // setOpenModal(true);
                      }}
                    >
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Modal
            style={{
              backgroundColor: "darkgrey",
              border: "2px solid black",
              margin: "auto",
              height: "50vh",
              width: "50%",
            }}
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <Grid container style={{ height: "100%", padding: 10 }}>
              <Grid item xs={12}>
                <Typography style={{ color: "white" }} variant="h6">
                  Going Flight: {total.goingFlightPrice}
                </Typography>
                {reduxTransaction.booking.type == "round_trip" ? (
                  <Typography style={{ color: "white" }} variant="h6">
                    Return Flight: {total.returningFlightPrice}
                  </Typography>
                ) : null}
                <Typography style={{ color: "white" }} variant="h6">
                  Seats: {total.seatCost}
                </Typography>
                <Typography style={{ color: "white" }} variant="h6">
                  Bagging: {total.baggingCost}
                </Typography>
                <Typography style={{ color: "white" }} variant="h6">
                  Discount: {total.discount}
                </Typography>
                <Typography style={{ color: "white" }} variant="h6">
                  Tax: {total.tax}
                </Typography>
                <Typography style={{ color: "white" }} variant="h6">
                  Promo: {total.promo}
                </Typography>
                <Typography style={{ color: "white" }} variant="h6">
                  Total: {total.totalCost}
                </Typography>
              </Grid>
              <Grid item container alignItems="flex-end" xs={12}>
                <Button
                  size="small"
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    axios
                      .post("http://localhost:5000/checkout/complete/", {
                        frontendInfo: reduxTransaction,
                        total: total,
                      })
                      .then((res) => {
                        console.log(res);
                        dispatch(storeReceiptInfo(res.data));
                        setOpenModal(false);
                        history.push("/app/status");
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  Pay
                </Button>
              </Grid>
            </Grid>
          </Modal>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CheckoutForm;
