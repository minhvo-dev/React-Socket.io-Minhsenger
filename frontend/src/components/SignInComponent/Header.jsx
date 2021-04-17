import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: theme.typography.pxToRem(36),
    fontWeight: "bold",
    color: theme.palette.primary.main
  },
  bannerView: {
    height: 50,
    overflowY: "hidden",
    position: "relative",
    display: "flex"
  },
  bannerContainer: {
    position: "absolute",
    width: "100%",
    height: "300%",
    top: "-300%",
    animation: `$rollUp 15000ms infinite ${theme.transitions.easing.easeInOut}`,
  },
  banner: {
    height: 50,
    width: "100%",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(16),
  },
  highlight: {
    color: theme.palette.secondary.main,
    fontWeight: "bold"
  },
  "@keyframes rollUp": {
    "0%": {
      top: "-500%",
    },
    "4%": {
      top: "-400%",
      opacity: 1
    },
    "24%": {
      top: "-400%",
    },
    "28%": {
      top: "-300%",
    },
    "48%": {
      top: "-300%",
    },
    "52%": {
      top: "-200%",
    },
    "72%": {
      top: "-200%",
    },
    "76%": {
      top: "-100%",
    },
    "96%": {
      top: "-100%",
      opacity: 1
    },
    "100%": {
      top: "0%",
      opacity: 0
    },
  },

}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.header}>
        {"Sign In"}
      </Typography>
      <div className={classes.bannerView}>
        <div className={classes.bannerContainer}>
          <Typography className={classes.banner}>{""}</Typography>
          <Typography className={classes.banner}>Start your <span className={classes.highlight}>Conversation</span></Typography>
          <Typography className={classes.banner}>Select your <span className={classes.highlight}>Room</span></Typography>
          <Typography className={classes.banner}>Register your <span className={classes.highlight}>Name</span></Typography>
          <Typography className={classes.banner}>{""}</Typography>
        </div>
      </div>
    </>
  );
};

export default Header;