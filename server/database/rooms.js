const { fromJS, Map } = require('immutable');
const log = require('winston');
const db = require('./client');

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

function actionReady(socket, { actionName, scope }) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.merge({ actionName, scope })
  ));
}

function actionNotReady(socket) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.delete('actionName').delete('scope')
  ));
}

const playersAllOnline = roomName =>
  db.get({
    TableName: 'PandoraRooms',
    Key: { roomName },
  }).promise()
    .then((data) => {
      const characters = data.Item.characters;
      return rooms.get(roomName).size === characters.length;
    })
    .catch((err) => { if (err) log.error(err); });

const actionsAllReady = roomName =>
  playersAllOnline(roomName)
    .then((res) => {
      if (!res) {
        return false;
      }
      return rooms.get(roomName).every(user => (
        user.has('actionName')
      ));
    })
    .catch((err) => { if (err) log.error(err); });

const submitActions = (roomName, io) =>
  io.to(roomName).emit('reset-action-chooser');

function logRooms() {
  log.debug('rooms', rooms.toJS());
}

module.exports = {
  logRooms,
  joinRoom,
  leaveRoom,
  actionReady,
  actionNotReady,
  actionsAllReady,
  submitActions,
};
