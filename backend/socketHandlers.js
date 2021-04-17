const {
  getAdminColor,
  getRandomColor,
  getRoomsInNamespace,
  getRoomsAndUsersInNamespace
} = require("./utils");

// keep track of names that are used
const clients = { Admin: { color: getAdminColor() } };

// check if the name exists
const isValidName = name => !clients.hasOwnProperty(name);

// a client wants to register their name to the app
const handleRegister = (io, socket, { name }) => {

  if (isValidName(name)) {
    console.log(`${name} has been registered`);
    // register the client to the client list with a random color
    // set the client name to the socket
    clients[name] = { color: getRandomColor() };
    socket.clientName = name;
    // emit the roomList event to the client to let it know the name is valid
    socket.emit("validName", { name: name, roomList: getRoomsInNamespace(io) });
  }
  else {
    console.log(`${name} has already existed`);
    // emit invalid name to let the client know that the name is taken
    socket.emit("invalidName");
  }
};

// a registered client want to join a room
const handleJoin = (io, socket, { room }) => {
  // send welcome message to that client
  // notify other clients in that room about this event

  const { clientName } = socket;
  console.log(`${clientName} has joined ${room} room`);

  socket.join(room);

  const date = Date.now();

  // welcome the client
  socket.emit("welcome", {
    date: date,
    room: room,
    text: `Welcome ${clientName} to ${room} room`
  });
  // notify other clients
  socket.to(room).emit("announcement", {
    date: date,
    text: `${clientName} has joined ${room} room`
  });

  // update online users to everyone
  const payload = getRoomsAndUsersInNamespace(io);
  io.emit("onlineUsers", payload);
};

// a registered client is disconnecting from the app
const handleDisconnecting = socket => {
  // remove the name from the list
  // notify other clients in the same room

  const { clientName } = socket;
  delete clients[clientName];

  const date = Date.now();
  for (let room of socket.rooms) {
    if (room !== socket.id) {
      console.log(`${clientName} has left ${room} room`);
      socket.to(room).emit("clientDisconnecting", {
        name: clientName,
        date: date,
        text: `${clientName} has left ${room} room`
      });
    }
  }
};

// a client disconnected event
const handleDisconnected = io => {
  // update online users to all clients
  const payload = getRoomsAndUsersInNamespace(io);
  io.emit("onlineUsers", payload);
};

// a registered client is typing in a room
const handleTyping = (socket, { room }) => {
  // notify other clients in that room about this event

  const { clientName } = socket;
  console.log(`${clientName} is typing in ${room} room`);
  socket.to(room).emit("typing", { name: clientName });
};

// a registered client stop typing in a room
const handleStopTyping = (socket, { room }) => {
  // notify other clients in that room about this event

  const { clientName } = socket;
  console.log(`${clientName} has stopped typing in ${room} room`);
  socket.to(room).emit("stopTyping", { name: clientName });
};

// a registered client is sending a message to a room
const handleMessage = (socket, { message, room }) => {
  // send the message back to the client
  // send the message to other clients in the room

  const { clientName } = socket;
  console.log(`${clientName} has sent message '${message}' to room ${room}`);

  const payload = {
    from: clientName,
    date: Date.now(),
    color: clients[clientName].color,
    text: message
  };

  socket.emit("newMessage", payload);
  socket.to(room).emit("newMessage", payload);
};

// a registered client want a list of rooms and users
const handleRequestOnlineUsers = (io, socket) => {
  // only send the payload back to this client

  const payload = getRoomsAndUsersInNamespace(io);
  socket.emit("onlineUsers", payload);
};

module.exports = {
  handleRegister,
  handleJoin,
  handleDisconnecting,
  handleDisconnected,
  handleTyping,
  handleStopTyping,
  handleMessage,
  handleRequestOnlineUsers
};