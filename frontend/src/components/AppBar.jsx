import React from "react";
import {
  AppBar as MuiAppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Group as GroupIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(0)
  }
}));

const AppBar = ({ handleOpenDrawer, iconVisible }) => {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {"Minhsenger™"}
        </Typography>
        {iconVisible && (
          <IconButton
            edge="end"
            className={classes.menuButton}
            onClick={handleOpenDrawer}
            color="inherit"
          >
            <GroupIcon />
          </IconButton>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;