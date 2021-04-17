import React from "react";
import {
  Container,
  Grow,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";

import Header from "./Header";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1)
  },
  highlight: {
    color: theme.palette.secondary.main,
    fontWeight: "bold"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2, 2),
  },
  registerButton: {
    marginLeft: theme.spacing(1)
  },
}));

const SignInComponent = ({ signInInfo, handleSignIn, handleJoinRoom }) => {
  const classes = useStyles();
  const [name, setName] = React.useState({ value: "", error: signInInfo.error });
  const [room, setRoom] = React.useState(null);

  React.useEffect(() => {
    setName({ ...name, error: signInInfo.error });
  }, [signInInfo.error]);

  React.useEffect(() => {
    if (signInInfo.roomOptions.length > 0) {
      // blindly set the room to Main
      // hopefully the data sent from backend has one
      setRoom("Main");
    }
  }, [signInInfo.roomOptions.length]);

  return (
    <Container align="center" className={classes.root}>
      <Header />

      {!signInInfo.name && (
        <Paper
          className={classes.inputContainer}
          elevation={3}
        >
          <TextField
            autoFocus
            fullWidth
            label="Name"
            placeholder="Enter your name"
            value={name.value}
            onChange={e => setName({ value: e.target.value, error: false })}
            error={name.error}
            helperText={name.error && "Name already exists"}
            variant="standard"
          />
          <IconButton
            disabled={name.error || !name.value}
            className={classes.registerButton}
            color="primary"
            onClick={() => handleSignIn(name.value)}
          >
            <ExitToAppIcon />
          </IconButton>
        </Paper>
      )}
      <Grow in={!!signInInfo.name} mountOnEnter unmountOnExit>
        <Paper
          className={classes.inputContainer}
          elevation={3}
        >
          <Typography variant="h6" color="primary">You signed in as <span className={classes.highlight}>{signInInfo.name}</span></Typography>
        </Paper>
      </Grow>
      <Grow in={signInInfo.roomOptions.length > 0} mountOnEnter unmountOnExit>
        <Paper
          className={classes.inputContainer}
          elevation={3}
        >
          <Autocomplete
            fullWidth
            value={room}
            options={signInInfo.roomOptions}
            onInputChange={(_event, value) => setRoom(value)}
            freeSolo
            renderInput={params => (
              <TextField
                {...params}
                margin="normal"
                variant="standard"
                label="Room"
                autoFocus
              />
            )}
          />
          <IconButton
            className={classes.registerButton}
            onClick={() => handleJoinRoom(room)}
            color="primary"
          >
            <ExitToAppIcon />
          </IconButton>
        </Paper>
      </Grow>
    </Container >
  );
};

export default SignInComponent;