const SocketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const db = require('../database/client');

const fetchJwtSecret = require('../config/jwt-secret');
const COOKIE_NAME = require('../config/cookie-name');
const { joinRoom, leaveRoom, logRooms } = require('../database/rooms');

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
    joinRoom(socket);
  }
  console.log('socket connected');
  logRooms();
  socket.on('disconnect', () => {
    if (!socket.user.master) {
      leaveRoom(socket);
    }
    console.log('socket disconnected');
    logRooms();
  });
});

module.exports = io;
