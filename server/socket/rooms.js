const { fromJS, Map } = require('immutable');
const log = require('winston');
const da = require('../data-access');
const game = require('../game');

let rooms = fromJS({});

function logRooms() {
  log.debug('rooms', rooms.toJS());
}

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

function actionReady(socket, { actionName }) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.merge({ action: actionName })
  ));
}

function actionNotReady(socket) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.delete('action')
  ));
}

function attrsReady(socket, attrs) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.merge({ attrs })
  ));
}

function attrsNotReady(socket) {
  const roomName = socket.user.roomName;
  rooms = rooms.updateIn([roomName, socket.id], user => (
    user.delete('attrs')
  ));
}

async function playersAllOnline(roomName) {
  const dbRoom = await da.getRoom(roomName);
  return rooms.get(roomName).size === dbRoom.characters.length;
}

async function actionsAllReady(roomName) {
  const allOnline = await playersAllOnline(roomName);
  if (!allOnline) { return false; }
  return rooms.get(roomName).every(user => (
    user.has('action')
  ));
}

async function attrsAllReady(roomName) {
  const allOnline = await playersAllOnline(roomName);
  if (!allOnline) { return false; }
  return rooms.get(roomName).every(user => (
    user.has('attrs')
  ));
}

function clearRoomActions(roomName) {
  rooms = rooms.update(roomName, users => (
    users.map(user => user.delete('action'))
  ));
}

function clearRoomAttrs(roomName) {
  rooms = rooms.update(roomName, users => (
    users.map(user => user.delete('attrs'))
  ));
}

async function submitActions(roomName, io) {
  const actionsMap = rooms.get(roomName).reduce((map, user) => (
    map.set(user.get('characterName'), user.get('action'))
  ), Map());

  await game.chooseActions(roomName, actionsMap);

  clearRoomActions(roomName);
  io.to(roomName).emit('sync-game-info');
}

async function submitAttrs(roomName, io) {
  const attrsMap = rooms.get(roomName).reduce((map, user) => (
    map.set(user.get('characterName'), user.get('attrs'))
  ), Map());

  await game.chooseAttrs(roomName, attrsMap);

  await game.nextRound(roomName);

  clearRoomAttrs(roomName);
  io.to(roomName).emit('sync-game-info');
}

module.exports = {
  logRooms,
  joinRoom,
  leaveRoom,
  actionReady,
  actionNotReady,
  actionsAllReady,
  submitActions,
  attrsReady,
  attrsNotReady,
  attrsAllReady,
  submitAttrs,
};
