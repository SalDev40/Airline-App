import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./views/layouts";
import AuthGuard from "./views/Auth/AuthGuard";
import LoginView from "./views/Auth/LoginView";
import RegisterView from "./views/Auth/RegisterView";
import PassengerForm from "./views/Passenger";
import FlightsTable from "./views/Flights";
import HomePage from "./views/Home/Home";
import BookForm from "./views/Book/BookForm";
import AllFlights from "./views/AllFlights/AllFlights";
import CheckoutForm from "./views/Checkout";
import StatusPage from "./views/Status/status";
import SeatsPage from "./views/Seats/Seats";
import BaggingPage from "./views/Bagging/Bagging";
import CheckIn from "./views/Checkin/Checkin";

import { useSelector } from "react-redux";
function Routes() {
  const reduxTransaction = useSelector((state) => state.transaction);
  return (
    <Switch>
      <Redirect exact from="/" to="/app" />
      <Layout>
        <Switch>
          <Redirect exact from="/app" to="/app/home" />
          <Route exact path="/app/home" component={HomePage} />
          <Route exact path="/app/book" component={BookForm} />
          <Route exact path="/app/all-flights" component={AllFlights} />
          <Route exact path="/app/checkin" component={CheckIn} />

          {/* 
          <Route exact path="/app/seats" component={SeatsPage} />
          <Route exact path="/app/bagging" component={BaggingPage} />
          <Route exact path="/app/passenger" component={PassengerForm} />
          <Route exact path="/app/status" component={StatusPage} />
          <Route exact path="/app/checkout" component={CheckoutForm} />
          
          */}

          {reduxTransaction.booking.bookRef ? (
            <>
              <Route exact path="/app/checkout" component={CheckoutForm} />
              <Route exact path="/app/flights" component={FlightsTable} />
              <Route exact path="/app/status" component={StatusPage} />
              <Route exact path="/app/passenger" component={PassengerForm} />
            </>
          ) : (
            <Redirect to="/app/home" />
          )}
        </Switch>
      </Layout>
      <Redirect to="/app/home" />
    </Switch>
  );
}

export default Routes;

{
  /* <Redirect exact from="/" to="/login" /> */
}
{
  /* <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegisterView} /> */
}
{
  /* AUTH  GUARD
      <AuthGuard
        path="/app"
        render={(props) => (
          <Layout {...props}>
            <Switch>
              <Redirect exact from="/app" to="/app/home" />
              <Route exact path="/app/home" component={HomePage} />
              <Route exact path="/app/about" component={CheckoutForm} />
              <Route exact path="/app/history" component={FlightsTable} />
              <Route exact path="/app/profiles" component={PassengerForm} />
              <Route exact path="/app/fuelquote" component={BookForm} />
            </Switch>
          </Layout>
        )}
      /> 
    </Switch>*/
}
