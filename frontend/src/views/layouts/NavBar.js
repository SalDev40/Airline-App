/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link, makeStyles, Grid, Button } from "@material-ui/core";

import { logOut } from "../../redux/actions/AuthActions";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  buttonStyle: {
    fontSize: 18,
  },
}));

function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid
      container
      style={{
        backgroundColor: "#222",
      }}
      justify="space-between"
    >
      <Grid
        item
        style={{
          margin: 10,
        }}
      >
        <Link
          component={RouterLink}
          to="/app/home"
          variant="body2"
          color="textSecondary"
        >
          <Button
            style={{
              color: "white",
            }}
            className={classes.buttonStyle}
            size="large"
          >
            Home
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/app/all-flights"
          variant="body2"
          color="textSecondary"
        >
          <Button
            style={{
              color: "white",
            }}
            className={classes.buttonStyle}
            size="large"
          >
            Flights
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/app/book"
          variant="body2"
          color="textSecondary"
        >
          <Button
            style={{
              color: "white",
            }}
            className={classes.buttonStyle}
            size="large"
          >
            Book
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        style={{
          margin: 10,
        }}
      >
        <Link
          variant="body2"
          to="/app/checkin"
          component={RouterLink}
          color="textSecondary"
        >
          <Button
            style={{
              color: "white",
            }}
            className={classes.buttonStyle}
            size="large"
            onClick={() => {
            }}
          >
            Checkin
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default NavBar;
