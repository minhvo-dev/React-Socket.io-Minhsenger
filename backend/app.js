const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable("trust proxy");

// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use((req, res, next) => {
  req.secure
    ? // request was via https, so do no special handling
    next()
    : // request was via http, so redirect to https
    res.redirect("https://" + req.headers.host + req.url);
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const server = require("http").createServer(app);
const io = require("socket.io")(server);
const socketHandlers = require("./socketHandlers");

io.on("connection", socket => {
  socket.on("register", payload => socketHandlers.handleRegister(io, socket, payload));
  socket.on("join", payload => socketHandlers.handleJoin(io, socket, payload));
  socket.on("message", payload => socketHandlers.handleMessage(socket, payload));
  socket.on("typing", payload => socketHandlers.handleTyping(socket, payload));
  socket.on("stopTyping", payload => socketHandlers.handleStopTyping(socket, payload));
  socket.on("requestOnlineUsers", () => socketHandlers.handleRequestOnlineUsers(io, socket));
  socket.on("disconnecting", () => socketHandlers.handleDisconnecting(socket));
  socket.on("disconnect", () => socketHandlers.handleDisconnected(io));
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});