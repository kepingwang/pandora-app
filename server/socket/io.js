const SocketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const log = require('winston');
const db = require('../database/client');

const fetchJwtSecret = require('../config/jwt-secret');
const COOKIE_NAME = require('../config/cookie-name');
const rooms = require('../database/rooms');

const io = new SocketIO();

io.use((socket, next) => {
  fetchJwtSecret()
    .then((jwtSecret) => {
      const token = cookie.parse(socket.handshake.headers.cookie)[COOKIE_NAME];
      if (!token) {
        return next(new Error('Authentication token not provided.'));
      }
      return jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication failed.'));
        }
        const email = decoded.sub;
        const master = decoded.master;
        return db.get({
          TableName: 'UserInfo',
          Key: { email },
        }, (e1, data) => {
          if (e1) return next(e1);
          const roomName = data.Item.roomName;
          const characterName = data.Item.characterName;
          /* eslint-disable no-param-reassign */
          socket.user = { email, master, roomName, characterName };
          /* eslint-enable */
          return next();
        });
      });
    });
});

io.on('connect', (socket) => {
  if (!socket.user.master) {
    rooms.joinRoom(socket);
  }
  log.debug('socket connected');
  rooms.logRooms();

  socket.on('disconnect', () => {
    if (!socket.user.master) {
      rooms.leaveRoom(socket);
    }
    log.debug('socket disconnected');
    rooms.logRooms();
  });

  socket.on('action-ready', async (action) => {
    rooms.actionReady(socket, action);
    const roomName = socket.user.roomName;
    const allReady = await rooms.actionsAllReady(roomName);
    if (!allReady) { return; }
    rooms.submitActions(roomName, io);
  });

  socket.on('action-not-ready', () => {
    rooms.actionNotReady(socket);
  });

  socket.on('attr-ready', async (attr) => {
    rooms.attrReady(socket, attr);
    const roomName = socket.user.roomName;
    const allReady = await rooms.attrAllReady(roomName);
    if (!allReady) { return; }
    rooms.submitAttr(roomName, io);
  });

  socket.on('attr-not-ready', () => {
    rooms.attrNotReady(socket);
  });
});

module.exports = io;
