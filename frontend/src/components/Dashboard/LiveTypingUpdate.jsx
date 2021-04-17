import React from "react";
import { makeStyles } from "@material-ui/core";

const getTypingStatus = typers => {
  if (typers.length === 0) return " ";
  if (typers.length === 1) return `${typers[0]} is typing...`;
  if (typers.length === 2) return `${typers[0]} and ${typers[1]} are typing...`;
  if (typers.length === 3) return `${typers[0]}, ${typers[1]} and ${typers[2]} are typings...`;
  return "Multiple users are typing...";
};

const useStyles = makeStyles(theme => ({
  container: {
    height: 40,
    paddingLeft: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.primary.main,
    fontStyle: "italic"
  }
}));

const LiveTypingUpdate = ({ typers }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.text}>{getTypingStatus(typers)}</p>
    </div>
  );
};

export default LiveTypingUpdate;