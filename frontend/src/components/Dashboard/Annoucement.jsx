import React from "react";
import { makeStyles } from "@material-ui/core";

import { dateToLocaleTimeString } from "../../services/dateService";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  container: {
    backgroundColor: "white",
    zIndex: 1,
    padding: theme.spacing(1, 1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    lineHeight: 1,
    padding: 0,
    margin: 0
  },
  subHeading: {
    fontSize: theme.typography.pxToRem(8),
    fontWeight: "bold",
    color: theme.palette.primary.main,
    lineHeight: 1,
    paddingTop: 0,
    marginTop: "4px",
    paddingBottom: 0,
    marginBottom: 0
  },
  line: {
    position: "absolute",
    top: "50%",
    left: "5%",
    width: "90%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderTop: "none",
    borderBottom: "none",
    zIndex: 0
  }
}));

const Announcement = ({ text, date }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {text && (<p className={classes.heading}>{text}</p>)}
        {date && (<p className={classes.subHeading}>{dateToLocaleTimeString(date)}</p>)}
      </div>
      <div className={classes.line}></div>
    </div>
  );
};

export default Announcement;