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

function BaggingPage(props) {
  const classes = useStyles();
  const reduxTransaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const history = useHistory();

  const [numCheckedBags, setNumCheckedBags] = React.useState(0);
  const [numCarryOnBags, setNumCarryOnBags] = React.useState(0);

  const [numCarryBagError, setNumCarryBagError] = React.useState();
  const [numCheckedBagError, setNumCheckedBagError] = React.useState();

  return (
    <Grid
      container
      justify="center"
      style={{
        marginTop: 20,
      }}
      spacing={1}
    >
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          CHOOSE BAGS
          <Button
            variant="contained"
            disabled={numCarryBagError || numCheckedBagError }
            color="primary"
            style={{
              marginLeft: 20,
            }}
           
            size="large"
            onClick={() => {
              props.setPassengerListBagging({
                carryOn: {
                  quantity: numCarryOnBags,
                  price: 35,
                },
                checked: {
                  quantity: numCheckedBags,
                  price: 33,
                },
              });
              props.closeBaggingModal();
            }}
          >
            DONE
          </Button>
        </Typography>
      </Grid>
      <Box p={2} />
      <Grid container spacing={1} item justify="center" xs={12}>
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              CARRY ON BAG - $35
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              error={
                numCarryOnBags < 0 ? true : false
              }
              helperText={
                numCarryOnBags < 0 ? 'cant be negative' : null
              }
              label="Quantity"
              type="number"
              variant="outlined"
              onChange={(event) => {
                if (event.target.value < 0) setNumCarryBagError(true);
                else setNumCarryBagError(false);
                setNumCarryOnBags(event.target.value);
              }}
              value={numCarryOnBags}
            />
          </Grid>
        </Grid>
        <Box p={1} />
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Typography variant="h6" style={{ textAlign: "center" }}>
              CHECKED BAGS - $33
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              error={
                numCheckedBags < 0 ? true : false
              }
              helperText={
                numCheckedBags < 0 ? 'cant be negative' : null
              }
              label="Quantity"
              type="number"
              variant="outlined"
              onChange={(event) => {
                if (event.target.value < 0) setNumCheckedBagError(true);
                else setNumCheckedBagError(false);
                setNumCheckedBags(event.target.value);
              }}
              value={numCheckedBags}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default BaggingPage;
