const socketIO = require('socket.io');

function initSocket(server) {
  const io = socketIO(server);
}

module.exports = io;
