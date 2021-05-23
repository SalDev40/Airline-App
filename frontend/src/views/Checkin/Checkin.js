import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";

import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  Link,
  Button,
  Container,
  Box,
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

function Checkin(props) {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ticketNo, setTicketNo] = React.useState();

  return (
    <Grid
      container
      justify="center"
      style={{
        margin: "auto",
        padding: 20,
        marginTop: 20,
      }}
      spacing={1}
    >
      <Grid item xs={12}>
        <TextField
          style={{ margin: "auto" }}
          InputLabelProps={{
            shrink: true,
          }}
          label="Ticket Number"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(event) => {
            setTicketNo(event.target.value);
          }}
          value={ticketNo}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          style={{ margin: "auto" }}
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={() => {
            axios
              .post("http://localhost:5000/passenger/checkin", {
                ticketNo: ticketNo,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
export default Checkin;
