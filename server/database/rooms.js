const { fromJS, Map } = require('immutable');

let rooms = fromJS({});

function joinRoom(socket) {
  const roomName = socket.user.roomName;
  socket.join(roomName);
  rooms = rooms.update(roomName, Map(), room => (
    room.set(socket.id, Map({
      email: socket.user.email,
      characterName: socket.user.characterName,
    }))
  ));
}

function leaveRoom(socket) {
  const roomName = socket.user.roomName;
  socket.leave(roomName);
  rooms = rooms.update(roomName, room => (
    room.delete(socket.id)
  ));
}

function logRooms() {
  console.log(rooms.toJS());
}

module.exports = {
  joinRoom, logRooms, leaveRoom,
};
