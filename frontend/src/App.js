import React from "react";
import { Grow, MuiThemeProvider } from "@material-ui/core";
import { io } from "socket.io-client";

import { dateToLocaleDateString, isSameDate } from "./services/dateService";

import AppBar from "./components/AppBar";
import OnlineDrawer from "./components/OnlineDrawer";
import SignInComponent from "./components/SignInComponent";
import Dashboard from "./components/Dashboard";
import AboutDialog from "./components/AboutDialog";

import theme from "./theme";

// const serviceURL = "http://localhost:5000";
const timeInterval = 2000; // to fire stopTyping event

const App = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [socket, setSocket] = React.useState(undefined);
  const [signInInfo, setSignInInfo] = React.useState({ name: undefined, error: false, room: undefined, roomOptions: [] });
  const [messages, setMessages] = React.useState([]);
  const [typers, setTypers] = React.useState([]);
  const [onlineUsers, setOnlineUsers] = React.useState(null);
  const [timeoutID, setTimeoutID] = React.useState(null);

  React.useEffect(() => {
    // const socket = io(serviceURL, {
    //   forceNew: true,
    //   transports: ["websocket"],
    //   autoConnect: true,
    //   reconnection: false
    // });
    const socket = io();
    
    socket.on("validName", ({ name, roomList }) => setSignInInfo(() => ({
      name,
      room: null,
      roomOptions: roomList,
      error: false
    })));

    socket.on("invalidName", () => {
      setSignInInfo(old => ({
        ...old,
        error: true
      }));
    });

    socket.on("welcome", ({ date, room, text }) => {
      setSignInInfo(old => ({
        ...old,
        room,
        error: false
      }));
      addNewMessage({ type: "announcement", date, text });
    });

    socket.on("announcement", ({ date, text }) => {
      addNewMessage({ type: "announcement", date, text });
    });

    socket.on("typing", ({ name }) => {
      setTypers(old => [...old, name]);
    });

    socket.on("stopTyping", ({ name }) => {
      setTypers(old => old.filter(typer => typer !== name));
    });

    socket.on("clientDisconnecting", ({ name, date, text }) => {
      setTypers(old => old.filter(typer => typer !== name));
      addNewMessage({ type: "announcement", date, text });
    });

    socket.on("newMessage", ({ from, date, color, text }) => {
      addNewMessage({
        type: "message",
        from,
        date,
        color,
        text,
        showTail: true
      });
    });

    socket.on("onlineUsers", payload => setOnlineUsers(payload));

    setSocket(socket);

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, []);

  const addNewMessage = ({ type, date, from, ...rest }) => setMessages(old => {
    const length = old.length;
    if (length === 0) {
      // client just join the room
      // append a date announcement to the messages
      const dateMessage = { type: "announcement", text: dateToLocaleDateString(date) };
      const realMessage = { type, date, from, ...rest };
      return [dateMessage, realMessage];
    }
    else {
      // check if new message on the same date as the last message
      // if yes, no need to append a date announcement
      // otherwise, append one
      const pendingMessages = [];
      const lastMessage = old[length - 1];
      if (isSameDate(lastMessage.date, date)) {
        // check if this message and the last message is from the same sender
        // if yes, hide the bubble tail
        // otherwise, who cares
        if (lastMessage.from && lastMessage.from === from) {
          const newMessages = [...old];
          // since we modify the last message, we remove the last one from the original message list
          newMessages.pop();
          newMessages.push({ ...lastMessage, showTail: false });
          newMessages.push({ type, date, from, ...rest });
          return newMessages;
        }
        else {
          pendingMessages.push({ type, date, from, ...rest });
          return [...old, ...pendingMessages];
        }
      }
      else {
        pendingMessages.push({ type: "announcement", text: dateToLocaleDateString(date) });
        pendingMessages.push({ type, date, from, ...rest });
        return [...old, ...pendingMessages];
      }
    }
  });

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
    if (socket && socket.connected) {
      socket.emit("requestOnlineUsers");
    }
  };

  const handleCloseDrawer = () => setDrawerVisible(false);

  const handleSignIn = name => {
    setSignInInfo({ ...signInInfo, error: false });
    if (socket && socket.connected) {
      socket.emit("register", { name });
    }
  };

  const handleJoinRoom = room => {
    if (socket && socket.connected) {
      socket.emit("join", { room });
    }
  };

  const handleTyping = () => {
    if (socket && socket.connected) {
      if (timeoutID) {
        clearTimeout(timeoutID);
        setTimeoutID(null);
      }
      else {
        socket.emit("typing", { room: signInInfo.room });
      }
      setTimeoutID(setTimeout(() => {
        socket.emit("stopTyping", { room: signInInfo.room });
        setTimeoutID(null);
      }, timeInterval));
    }
  };

  const handleSendMessage = (message) => {
    if (socket && socket.connected && message && message.trim()) {
      if (timeoutID) {
        clearTimeout(timeoutID);
        setTimeoutID(null);
        socket.emit("stopTyping", { room: signInInfo.room });
      }
      socket.emit("message", { room: signInInfo.room, message });
    }
  };

  const handleCloseDialog = () => setDialogVisible(false);

  const handleOpenDialog = () => setDialogVisible(true);

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar
        handleOpenDrawer={handleOpenDrawer}
        iconVisible={!!signInInfo.room}
      />
      <OnlineDrawer
        name={signInInfo.name}
        visible={drawerVisible}
        onlineUsers={onlineUsers}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDialog={handleOpenDialog}
      />
      <AboutDialog
        open={dialogVisible}
        handleClose={handleCloseDialog}
      />
      {!signInInfo.room ? (
        <SignInComponent
          signInInfo={signInInfo}
          handleSignIn={handleSignIn}
          handleJoinRoom={handleJoinRoom}
        />
      ) : (
        <Grow in={!!signInInfo.room}>
          <Dashboard
            messages={messages}
            signInInfo={signInInfo}
            typers={typers}
            handleTyping={handleTyping}
            handleSendMessage={handleSendMessage}
          />
        </Grow>
      )}
    </MuiThemeProvider>
  );
};

export default App;
