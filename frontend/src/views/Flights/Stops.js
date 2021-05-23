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

export default function StopsTable(props) {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {}, []);

  return (
    <Grid style={{
        padding: 10
    }} container>
      <Grid item xs={12}>
        <TableContainer style={{ height: 300 }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.HeadTableRow}>
                <TableCell className={classes.HeadTableCell}>FLIGHT</TableCell>
                <TableCell className={classes.HeadTableCell}>FROM</TableCell>
                <TableCell className={classes.HeadTableCell}>
                  DEPART DATE
                </TableCell>
                <TableCell className={classes.HeadTableCell}>
                  DEPART TIME
                </TableCell>
                <TableCell className={classes.HeadTableCell}>TO</TableCell>
                <TableCell className={classes.HeadTableCell}>
                  ARRIVAL DATE
                </TableCell>
                <TableCell className={classes.HeadTableCell}>
                  ARRIVAL TIME
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.indirectFlights.map((row, index) => (
                <TableRow
                  hover
                  style={{ borderBottom: "3px solid black" }}
                  key={index}
                >
                  <TableCell>{row.flight_id}</TableCell>
                  <TableCell>{row.departure_airport}</TableCell>
                  <TableCell>
                    {new Date(row.scheduled_departure).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(row.scheduled_departure).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{row.arrival_airport}</TableCell>
                  <TableCell>
                    {new Date(row.scheduled_arrival).toDateString()}
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
  );
}
