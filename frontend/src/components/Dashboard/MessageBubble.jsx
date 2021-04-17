import React from "react";
import {
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";

import { dateToLocaleTimeString } from "../../services/dateService";

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 0,
    justifyContent: "flex-start",
    animation: `$appear 500ms ${theme.transitions.easing.easeInOut}`
  },
  container: {
    margin: 0,
    width: "80%",
    color: theme.palette.primary.main
  },
  bubble: props => ({
    color: "white",
    padding: theme.spacing(1),
    position: "relative",
    backgroundColor: props.color,
    textAlign: "left"
  }),
  bubbleWithLeftTail: props => ({
    color: "white",
    padding: theme.spacing(1),
    position: "relative",
    backgroundColor: props.color,
    textAlign: "left",
    "&:before": {
      content: "\"\"",
      position: "absolute",
      width: 0,
      height: 0,
      top: "100%",
      left: theme.spacing(1),
      borderWidth: "0.5rem",
      borderStyle: "solid",
      borderColor: "transparent",
      borderBottom: "none",
      borderTopColor: props.color
    }
  }),
  bubbleWithRightTail: props => ({
    color: "white",
    padding: theme.spacing(1),
    position: "relative",
    backgroundColor: props.color,
    textAlign: "left",
    "&:before": {
      content: "\"\"",
      position: "absolute",
      width: 0,
      height: 0,
      top: "100%",
      right: theme.spacing(1),
      borderWidth: "0.5rem",
      borderStyle: "solid",
      borderColor: "transparent",
      borderBottom: "none",
      borderTopColor: props.color
    }
  }),
  header: props => ({
    fontSize: theme.typography.pxToRem(8),
    fontWeight: "bold",
    margin: theme.spacing(0, 2),
    textAlign: props.headerAlign
  }),
  footer: props => ({
    fontSize: theme.typography.pxToRem(10),
    fontWeight: "bold",
    margin: theme.spacing(0, 4),
    textAlign: props.footerAlign
  }),
  padding: {
    height: 10,
  },
  "@keyframes appear": {
    "0%": {
      opacity: 0,
      transform: "translateY(10%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  }
}));

const MessageBubble = ({ text, date, from, color, showTail }) => {
  const bubbleAlign = from ? "flex-start" : "flex-end";
  const headerAlign = from ? "right" : "left";
  const footerAlign = from ? "left" : "right";
  const classes = useStyles({ color, headerAlign, footerAlign });

  return (
    <div className={classes.root} style={{ alignItems: bubbleAlign }}>
      <div className={classes.container}>
        <Typography className={classes.header}>
          {dateToLocaleTimeString(date)}
        </Typography>
        {showTail ? (
          <Paper className={from ? classes.bubbleWithLeftTail : classes.bubbleWithRightTail}>
            <Typography>{text}</Typography>
          </Paper>
        ) : (
          <Paper className={classes.bubble}>
            <Typography>{text}</Typography>
          </Paper>
        )}
        {showTail && from && (
          <Typography className={classes.footer}>
            {`sent by ${from}`}
          </Typography>
        )}
        {showTail && !from && (
          <div className={classes.padding}></div>
        )}
      </div>
    </div>
  );

};

export default MessageBubble;