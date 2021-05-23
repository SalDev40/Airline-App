import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  makeStyles,
  Typography,
  Link,
  Container,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  Table,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(() => ({
  table: {},
  HeadTableRow: {
    backgroundColor: "black",
  },
  HeadTableCell: {
    color: "white",
  },
}));

function AllFlights() {
  const classes = useStyles();
  const [deptApts, setDeptApts] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/flights/select-all-deptapt")
      .then(async (res) => {
        console.log(res);
        let tempApts = res.data.deptApts;
        let allFlightsEachAirport = [];
        for (const apt of tempApts) {
          console.log(apt);
          try {
            let flights = await axios.post(
              "http://localhost:5000/flights/select-all-flights-deptapt",
              { deptApt: apt }
            );
            allFlightsEachAirport.push({
              deptApt: apt.departure_airport,
              flights: flights.data.flights,
            });
            console.log(allFlightsEachAirport);
          } catch (e) {
            console.log(e);
          }
        }
        setDeptApts(allFlightsEachAirport);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container justify="center" spacing={1}>
      {deptApts.map((apt) => (
        <Grid
          container
          xs={5}
          style={{
            margin: 20,
            border: "1px solid black",
            backgroundColor: "lightgrey",
            borderRadius: 10,
          }}
          item
          spacing={1}
        >
          <Grid container item xs={12}>
            <Typography
              variant="h6"
              style={{
                margin: "auto",
                textTransform: "uppercase",
              }}
            >
              {apt.deptApt}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <TableContainer style={{ height: 300 }}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow  className={classes.HeadTableRow}>
                    <TableCell className={classes.HeadTableCell}>
                      Arrival
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      Date
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      Depart Time
                    </TableCell>
                    <TableCell className={classes.HeadTableCell}>
                      Arrival Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apt.flights.map((row, index) => (
                    <TableRow
                      style={{ borderBottom: "3px solid black"  }}
                      key={index}
                    >
                      <TableCell>{row.arrival_airport}</TableCell>
                      <TableCell>
                        {new Date(row.scheduled_departure).toDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(row.scheduled_departure).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        {new Date(row.scheduled_arrival).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default AllFlights;
