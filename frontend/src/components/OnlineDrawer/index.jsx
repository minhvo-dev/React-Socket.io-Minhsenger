import React from "react";
import {
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";
import {
  ChevronRight as ChevronRightIcon,
  LiveHelp as LiveHelpIcon
} from "@material-ui/icons";

import OnlineList from "./OnlineList";

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    width: 250
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    padding: theme.spacing(2, 1)
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
  },
}));

const OnlineDrawer = ({
  name,
  visible,
  onlineUsers,
  handleCloseDrawer,
  handleOpenDialog
}) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={handleCloseDrawer}
    >
      <div
        role="presentation"
        onClick={handleCloseDrawer}
        onKeyDown={handleCloseDrawer}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronRightIcon />
          </IconButton>
          {name && <Typography variant="caption" color="primary">{`You signed in as ${name}`}</Typography>}
        </div>
        <Divider />
        <div className={classes.container}>
          <div className={classes.buttonContainer}>

            <Button
              variant="text"
              color="primary"
              startIcon={<LiveHelpIcon />}
              onClick={handleOpenDialog}
            >
              {"About"}
            </Button>
          </div>
          {!onlineUsers ? (
            <CircularProgress />
          ) : (
            Object.keys(onlineUsers).map((room, idx) => (
              <React.Fragment key={`${room}_${idx}`}>
                <Typography variant="subtitle2" color="primary">{room}</Typography>
                <Divider />
                <OnlineList users={onlineUsers[room]} />
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default OnlineDrawer;