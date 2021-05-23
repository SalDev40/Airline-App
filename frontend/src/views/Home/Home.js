import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, makeStyles, Typography, Link, Button } from "@material-ui/core";
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

function HomePage() {
  const classes = useStyles();
  const [deptApts, setDeptApts] = React.useState([]);
  return (
    <Grid
      container
      style={{
        background:
          "url(https://get.pxhere.com/photo/sky-airplane-air-travel-cloud-sunset-airline-daytime-flight-aircraft-evening-afterglow-vehicle-wide-body-aircraft-aviation-dusk-takeoff-airliner-wing-horizon-atmosphere-city-airbus-silhouette-aerospace-engineering-boeing-747-skyline-1614364.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Grid item style={{ padding: 20 }} xs={12}>
        <Grid item xs={12}>
          <Link
            component={RouterLink}
            style={{
              textDecoration: "none",
            }}
            to="/app/all-flights"
            color="textSecondary"
          >
            <Typography
              style={{
                color: "white",
                fontFamily: "Droid serif",
                fontStyle: "italic",
                textDecoration: "none",

                paddingLeft: 10,
                fontSize: 60,
              }}
            >
              Explore what we have to offer
              <Button
                style={{
                  color: "blue",
                  textDecoration: "none",
                  fontSize: 20,
                  fontFamily: "Droid serif",
                  fontStyle: "italic",
                }}
                size="large"
              >
                See all Flights!
              </Button>
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            component={RouterLink}
            style={{
              textDecoration: "none",
            }}
            to="/app/book"
            color="textSecondary"
          >
            <Typography
              style={{
                color: "white",
                fontFamily: "Droid serif",
                fontStyle: "italic",
                textDecoration: "none",

                paddingLeft: 40,
                fontSize: 40,
              }}
            >
              Like what you see ?
              <Button
                style={{
                  color: "blue",
                  textDecoration: "none",
                  fontSize: 20,
                  fontFamily: "Droid serif",
                  fontStyle: "italic",
                }}
                size="large"
              >
                Book Now!
              </Button>
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomePage;
