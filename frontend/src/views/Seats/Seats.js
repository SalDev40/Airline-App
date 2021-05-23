import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";

import {
  Grid,
  makeStyles,
  Typography,
  Link,
  Button,
  Container,
} from "@material-ui/core";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  table: {},
  HeadTableRow: {
    backgroundColor: "black",
  },
  HeadTableCell: {
    color: "white",
  },
}));

function SeatsPage(props) {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const history = useHistory();

  const [goingSeat, setGoingSeat] = React.useState({});
  const [returningSeat, setReturningSeat] = React.useState({});

  const [seats, setSeats] = React.useState([]);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/flights/select-all-flights-seats", {
        goingFlightId: reduxTransaction.selectedFlights.goingFlight.flight_id,
        type: reduxTransaction.booking.type,
        returningFlightId:
          reduxTransaction.booking.type == "round_trip"
            ? reduxTransaction.selectedFlights.returningFlight.flight_id
            : null,
        fromAirport:
          reduxTransaction.selectedFlights.goingFlight.departure_airport,
        toAirport: reduxTransaction.selectedFlights.goingFlight.arrival_airport,
      })
      .then(async (res) => {
        console.log(res);
        setSeats(res.data.seats);
      })
      .catch((err) => console.log(err));
  }, []);

  let tempSeats = [
    {
      from: "HOU",
      to: "JFK",
      going: true,
      returning: false,
      seats: [
        { number: "A12", price: 20 },
        { number: "A23", price: 30 },
        { number: "A33", price: 30 },
        { number: "A53", price: 30 },
      ],
    },
    {
      from: "JFK",
      to: "HOU",
      going: false,
      returning: true,
      seats: [
        { number: "B12", price: 20 },
        { number: "B22", price: 30 },
        { number: "B32", price: 40 },
        { number: "B42", price: 50 },
      ],
    },
  ];

  return (
    <Grid
      container
      justify="center"
      style={{
        padding: 10,
      }}
      spacing={1}
    >
      <Grid item xs={12}>
        <Typography
          style={{
            textAlign: "center",
            fontSize: 30,
          }}
        >
          CHOOSE A SEAT
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: 20,
            }}
            size="large"
            onClick={() => {
              props.setPassengerListSeat(goingSeat, returningSeat);
              props.closeSeatsModal();
            }}
          >
            Done
          </Button>
        </Typography>
      </Grid>
      {seats.map((flight) => (
        <Grid
          container
          xs={reduxTransaction.booking.type == "one_way" ? 12 : 6}
          style={{
            borderRight:
              reduxTransaction.booking.type == "one_way"
                ? null
                : flight.going
                ? "8px solid black"
                : null,
          }}
          item
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              style={{
                padding: 10,
                textTransform: "uppercase",
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {reduxTransaction.booking.type == "one_way"
                ? `${flight.from}`
                : `${flight.from} -> ${flight.to}`}
            </Typography>
          </Grid>
          <Grid container item xs={12} justify="center" spacing={1}>
            {flight.seats.map((seat) => (
              <Grid item>
                <Button
                  variant={
                    flight.going && goingSeat.number == seat.seat_no
                      ? "outlined"
                      : flight.returning && returningSeat.number == seat.seat_no
                      ? "outlined"
                      : "contained"
                  }
                  color="primary"
                  style={{
                    border: "1px solid blue",
                    fontSize: 20,
                  }}
                  onClick={(event) => {
                    console.log({
                      number: seat.seat_no,
                      price: seat.price,
                    });
                    if (flight.going) {
                      setGoingSeat({
                        number: seat.seat_no,
                        price: seat.price,
                      });
                    }

                    if (flight.returning) {
                      setReturningSeat({
                        number: seat.seat_no,
                        price: seat.price,
                      });
                    }
                  }}
                  size="small"
                >
                  {seat.seat_no} - ${seat.price}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default SeatsPage;
