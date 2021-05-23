import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, makeStyles, Typography, Link, Button } from "@material-ui/core";
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

function StatusPage() {
  const reduxTransaction = useSelector((state) => state.transaction);

  return (
    <Grid container style={{border: '1px solid red'}}>
      <Grid item xs={12}>
        <Typography  variant="h6">
          Receipt No: {reduxTransaction.receiptInfo.receipt[0].receipt_no}
        </Typography>
        {reduxTransaction.receiptInfo.passengers.map((pass) => (
          <Typography  variant="h6">
            PassengerID: {pass.passenger_id}
          </Typography>
        ))}
        {reduxTransaction.receiptInfo.boardingPasses.map((pass, index) => (
          <>
            <Typography  variant="h6">
              gate: {pass[0].arrival_gate}
            </Typography>
            <Typography  variant="h6">
              time: {pass[0].arrival_time}
            </Typography>
            <Typography  variant="h6">
              baggage: {pass[0].baggage_no}
            </Typography>
            <Typography  variant="h6">
              boarding number: {pass[0].boarding_no}
            </Typography>
            <Typography  variant="h6">
              ticket number: {pass[0].ticket_no}
            </Typography>
          </>
        ))}
      </Grid>
    </Grid>
  );
}

export default StatusPage;
