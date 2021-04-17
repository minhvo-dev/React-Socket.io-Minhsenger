import React from "react";
import {
  Divider,
  IconButton,
  InputBase,
  makeStyles,
  Paper
} from "@material-ui/core";
import {
  Send as SendIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const MessageInput = ({ room, handleTyping, handleSendMessage }) => {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const inputRef = React.useRef(null);

  const handleOnChange = event => {
    setText(event.target.value);
    handleTyping();
  };

  const handleOnClick = () => {
    handleSendMessage(text);
    setText("");
    inputRef.current.focus();
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <InputBase
        autoFocus
        value={text}
        multiline
        className={classes.input}
        placeholder={`Message to ${room}`}
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleOnChange}
        inputRef={inputRef}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={handleOnClick}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
};

export default MessageInput;