import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
  },
}));

function DashboardLayout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
