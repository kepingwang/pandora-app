const SocketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const fetchJwtSecret = require('../config/jwt-secret');
const COOKIE_NAME = require('../config/cookie-name');
const rooms = require('./rooms');
const da = require('../data-access');

const io = new SocketIO();

io.use(async (socket, next) => {
  const jwtSecret = await fetchJwtSecret();
  const token = cookie.parse(socket.handshake.headers.cookie)[COOKIE_NAME];
  if (!token) {
    return next(new Error('Authentication token not provided.'));
  }
  const decoded = jwt.verify(token, jwtSecret);
  const email = decoded.sub;
  const { master, roomName, characterName } = await da.getUser(email);
  /* eslint-disable no-param-reassign */
  socket.user = { email, master, roomName, characterName };
  /* eslint-enable */
  return next();
});

io.on('connect', (socket) => {
  if (!socket.user.master) {
    rooms.joinRoom(socket);
  }

  socket.on('disconnect', () => {
    if (!socket.user.master) {
      rooms.leaveRoom(socket);
    }
  });

  socket.on('action-ready', async (action) => {
    rooms.actionReady(socket, action);
    const roomName = socket.user.roomName;
    const allReady = await rooms.actionsAllReady(roomName);
    if (!allReady) { return; }
    await rooms.submitActions(roomName, io);
  });

  socket.on('action-not-ready', () => {
    rooms.actionNotReady(socket);
  });

  socket.on('attrs-ready', async (attrs) => {
    rooms.attrsReady(socket, attrs);
    const roomName = socket.user.roomName;
    const allReady = await rooms.attrsAllReady(roomName);
    if (!allReady) { return; }
    await rooms.submitAttrs(roomName, io);
  });

  socket.on('attrs-not-ready', () => {
    rooms.attrsNotReady(socket);
  });
});

module.exports = io;
