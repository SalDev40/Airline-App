import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import RegisterForm from "./RegisterForm";

const useStyles = makeStyles((theme) => ({}));

function RegisterView() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box mb={8} display="flex" alignItems="center"></Box>
      <Card
        style={{
          backgroundColor: "lightgrey",
          border: "2px solid black",
        }}
      >
        <CardContent>
          <Typography variant="h2" color="textPrimary">
            Register
          </Typography>
          <Box mt={2}></Box>
          <Box mt={3}>
            <RegisterForm />
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            color="textSecondary"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RegisterView;
