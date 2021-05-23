import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Box, Button, TextField, makeStyles } from "@material-ui/core";

import { storeUSER } from "../../../redux/actions/AuthActions";
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

function LoginForm({ onSubmitSuccess }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxAuth = useSelector((state) => state.auth);
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
                axios({
                  method: "POST",
                  url: "http://localhost:5000/auth/login",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    email: email,
                    password: password,
                  },
                })
                  .then((res) => {
                    //set token to be persistent in local storage
                    if (res.data.success) {
                      dispatch(storeUSER(res.data));
                      localStorage.setItem("authtoken", res.data.token);
                      localStorage.setItem("userEmail", res.data.email);
                      localStorage.setItem("userId", res.data.userId);
                      //push to home page
                      history.push("/app/home");
                    }
                    if (res.data.error) {
                      toast.error(res.data.error);
                    }
                  })
                  .catch((err) => {
                    toast.error(err)
                    console.log(err);
                  });
              }}
            >
              Log In
            </Button>
          </Box>
        </>
      )}
    </Formik>
  );
}

export default LoginForm;
