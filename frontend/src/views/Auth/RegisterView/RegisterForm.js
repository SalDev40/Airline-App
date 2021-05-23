import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Formik } from "formik";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles,
  Link,
  setRef,
} from "@material-ui/core";

toast.configure({
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
const useStyles = makeStyles(() => ({
  root: {},
}));

function RegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <Formik
      initialValues={{
        email: null,
        password: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .nullable()
          .required("Email is required"),
        password: Yup.string()
          .nullable()
          .required("Password is required"),
      })}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={(event) => {
              handleChange(event);
              setEmail(event.target.value);
            }}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={(event) => {
              handleChange(event);
              setPassword(event.target.value);
            }}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => {
                axios
                  .post("http://localhost:5000/auth/register", {
                    email: email,
                    password: password,
                  })
                  .then((res) => {
                    if (res.data.success) {
                      //push to home page
                      history.push("/login");
                    }
                    if (res.data.error) {
                      toast.error(res.data.error);
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Create
            </Button>
          </Box>
        </>
      )}
    </Formik>
  );
}

export default RegisterForm;
