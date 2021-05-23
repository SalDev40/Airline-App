import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  TableRow,
  Modal,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Table,
  Typography,
  Grid,
  Button,
  Box,
  Checkbox,
} from "@material-ui/core";

import axios from "axios";
import { toast } from "react-toastify";

import { storeSelectedFlights } from "../../redux/actions/TransactionAction";
import StopsTable from "./Stops";

const useStyles = makeStyles({
  table: {},
  HeadTableRow: {
    backgroundColor: "black",
  },
  HeadTableCell: {
    color: "white",
  },
});

toast.configure({
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export default function FlightsTable() {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);
  const [flights, setFlightData] = React.useState([]);
  const [bookingDetails, setBookingDetails] = React.useState(
    reduxTransaction.booking
  );
  const [checkedFlightDept, setCheckedFlightDept] = React.useState(-1);
  const [checkedFlightReturning, setCheckedFlightReturning] = React.useState(
    -1
  );
  const [type, setType] = React.useState("round_trip");
  const [openStopsModal, setOpenStopsModal] = React.useState();
  const [stopFlight, setStopFlight] = React.useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(bookingDetails);
    let url = null;
    if (bookingDetails.type == "round_trip") {
      if (
        bookingDetails.returnDate != null &&
        bookingDetails.deptDate != null
      ) {
        /* round_trip with  scheduled_departure and  scheduled_arrival */
        url = "http://localhost:5000/flights/round-select-airport-date";
      } else {
        /* round_trip with no scheduled_departure and no scheduled_arrival */
        url = "http://localhost:5000/flights/round-select-airport";
      }
    }

    if (bookingDetails.type == "one_way") {
      if (bookingDetails.deptDate != null) {
        /* one_way with  scheduled_departure */
        url = "http://localhost:5000/flights/one-select-airport-date";
      } else {
        /* one_way with no scheduled_departure, get all flights matching airports */
        url = "http://localhost:5000/flights/one-select-airport";
      }
    }

    if (url) {
      axios
        .post(url, {
          bookingDetails: reduxTransaction.booking,
        })
        .then((res) => {
          console.log(res.data.flightData);
          setFlightData(res.data.flightData);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Grid container style={{ marginTop: 30 }} justify="space-between">
      {flights.map((flight) => (
        <Grid
          style={{
            border: "1px solid black",
            backgroundColor: "lightgrey",
            padding: 15,
          }}
          container
          xs={bookingDetails.type == "one_way" ? 12 : 6}
          spacing={1}
          item
        >
          <Grid container item xs={12}>
            <Grid item xs={10}>
              <Typography
                variant="h6"
                style={{
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {bookingDetails.type == "one_way"
                  ? `${flight.from}`
                  : `${flight.from} -> ${flight.to} `}
              </Typography>
            </Grid>
            <Grid item container justify="flex-end" xs={2}>
              {(bookingDetails.type == "one_way" && checkedFlightDept != -1) ||
              (flight.returning &&
                checkedFlightDept != -1 &&
                checkedFlightReturning != -1) ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    let goingFlight = flights[0].flights[checkedFlightDept];
                    let returningFlight = null;
                    if (bookingDetails.type != "one_way")
                      returningFlight =
                        flights[1].flights[checkedFlightReturning];

                    console.log("selected going: ", goingFlight);
                    console.log("selected departing: ", returningFlight);
                    dispatch(
                      storeSelectedFlights(goingFlight, returningFlight)
                    );
                    history.push("/app/passenger");
                  }}
                  color="primary"
                >
                  Continue
                </Button>
              ) : null}
            </Grid>
          </Grid>

          <Box p={0.5} />
          <Grid item xs={12}>
            <TableContainer style={{ height: 600 }}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow className={classes.HeadTableRow}>
                    <TableCell className={classes.HeadTableCell}>
                      FLIGHT
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      DATE
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      DEPART TIME
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      ARRIVAL TIME
                    </TableCell>
                    {bookingDetails.type == "one_way" ? (
                      <TableCell className={classes.HeadTableCell}>
                        DEST
                      </TableCell>
                    ) : null}
                    <TableCell className={classes.HeadTableCell}>
                      STOPS
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      PRICE
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flight.flights.length > 0 ? (
                    flight.flights.map((row, index) => (
                      <TableRow
                        hover
                        style={{ borderBottom: "3px solid black" }}
                        key={index}
                      >
                        <TableCell>{row.flight_id}</TableCell>
                        <TableCell>
                          {flight.going
                            ? new Date(row.scheduled_departure).toDateString()
                            : new Date(row.scheduled_arrival).toDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(
                            row.scheduled_departure
                          ).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.scheduled_arrival).toLocaleTimeString()}
                        </TableCell>
                        {bookingDetails.type == "one_way" ? (
                          <TableCell>{row.arrival_airport}</TableCell>
                        ) : null}
                        <TableCell>
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setStopFlight(row);
                              setOpenStopsModal(true);
                            }}
                            size="small"
                          >
                            {row.indirectFlights.length}
                          </Button>
                        </TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>
                          <Checkbox
                            size="small"
                            checked={
                              flight.going && index == checkedFlightDept
                                ? true
                                : false ||
                                  (flight.returning &&
                                    index == checkedFlightReturning)
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              flight.going
                                ? setCheckedFlightDept(index)
                                : setCheckedFlightReturning(index);
                            }}
                          />
                        </TableCell>
                        <Modal
                          style={{
                            backgroundColor: "lightyellow",
                            border: "2px solid black",
                            margin: "auto",
                            height: "55vh",
                            width: "60%",
                            overflow: "auto",
                          }}
                          open={openStopsModal}
                          onClose={() => {
                            setOpenStopsModal(false);
                          }}
                        >
                          <StopsTable
                            // indirectFlights={[
                            //   {
                            //     flight_id: 1006,
                            //     departure_airport: "POR",
                            //     scheduled_departure: "2020-11-13T06:50:00.000Z",
                            //     arrival_airport: "ORE",
                            //     scheduled_arrival: "2020-11-13T06:50:00.000Z",
                            //   },
                            //   {
                            //     flight_id: 1006,
                            //     departure_airport: "POR",
                            //     scheduled_departure: "2020-11-13T06:50:00.000Z",
                            //     arrival_airport: "ORE",
                            //     scheduled_arrival: "2020-11-13T06:50:00.000Z",
                            //   },
                            // ]}
                            indirectFlights={stopFlight.indirectFlights}
                          />
                        </Modal>
                      </TableRow>
                    ))
                  ) : (
                    <Typography
                      variant="h6"
                      style={{
                        margin: "auto",
                        textTransform: "uppercase",
                      }}
                    >
                      NO FLIGHTS AVAILABLE FOR GIVEN SEARCH
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
