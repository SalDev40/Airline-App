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
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();

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
            Login
          </Typography>
          <Box mt={2}></Box>
          <Box mt={3}>
            <LoginForm />
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            color="textSecondary"
          >
            Create new account
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginView;
