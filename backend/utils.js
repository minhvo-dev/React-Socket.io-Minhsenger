const matColors = require("./matdes100colors.json");
const adminColor = "rgba(7, 87, 91, 1)";

const getRandomColor = () => matColors.colours[Math.floor(Math.random() * matColors.colours.length)];

const getAdminColor = () => adminColor;

const getRoomsInNamespace = (io, namespace = "/") => {
  const roomNames = ["Main"];
  // in v4.0, rooms is a Map<Room, Set<SocketId>>
  const rooms = io.of(namespace).adapter.rooms;
  rooms.forEach((value, key) => {
    if (key !== "Main") {
      // if the key is also stored in the value
      // then it is a socket, otherwise it is a key
      if (value.has(key) === false) {
        roomNames.push(key);
      }
    }
  });
  return roomNames.sort((a, b) => a.localeCompare(b));
};

const getRoomsAndUsersInNamespace = (io, namespace = "/") => {
  const roomNames = getRoomsInNamespace(io, namespace);
  const rooms = io.of(namespace).adapter.rooms;
  const result = {};
  roomNames.forEach(roomName => {
    // make sure that the room exists
    // since the Main room is default
    if (rooms.has(roomName)) {
      const users = [];
      // get all usernames in this room
      rooms.get(roomName).forEach(socketID => {
        users.push(io.of(namespace).sockets.get(socketID).clientName);
      });
      result[roomName] = users;
    }
  });
  return result;
};

module.exports = {
  getRandomColor,
  getAdminColor,
  getRoomsInNamespace,
  getRoomsAndUsersInNamespace
};