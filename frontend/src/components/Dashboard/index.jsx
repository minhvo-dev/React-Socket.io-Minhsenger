import React from "react";
import {
  Container,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";

import MessageInput from "./MessageInput";
import Announcement from "./Annoucement";
import MessageBubble from "./MessageBubble";
import LiveTypingUpdate from "./LiveTypingUpdate";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  header: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: "bold",
    color: theme.palette.primary.main
  },
  listContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  list: {
    flex: 1,
    padding: theme.spacing(2, 1),
    maxHeight: "calc(80vh - 120px)",
    overflow: "auto",
    position: "relative"
  }
}));

const Dashboard = ({
  signInInfo,
  messages,
  typers,
  handleTyping,
  handleSendMessage
}) => {
  const classes = useStyles();
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <Container align="center" className={classes.root}>
      <Typography className={classes.header}>
        {signInInfo.room}
      </Typography>
      <Paper elevation={0} className={classes.listContainer}>
        <List
          className={classes.list}
        >
          {messages.map((message, idx) => {
            if (message.type === "announcement") {
              return (
                <Announcement
                  key={`${message.text}_${message.time}_${idx}`}
                  text={message.text}
                  date={message.date}
                />
              );
            }
            if (message.type === "message") {
              return (
                <MessageBubble
                  key={`${message.text}_${message.time}_${idx}`}
                  text={message.text}
                  date={message.date}
                  from={message.from === signInInfo.name ? null : message.from}
                  color={message.color}
                  showTail={message.showTail}
                />
              );
            }
            return null;
          })}
          <ListItem ref={scrollRef} style={{ width: 0, height: 0 }}></ListItem>
        </List>
      </Paper>
      <LiveTypingUpdate typers={typers} />
      <MessageInput
        room={signInInfo.room}
        handleTyping={handleTyping}
        handleSendMessage={handleSendMessage}
      />
    </Container>
  );
};

export default Dashboard;