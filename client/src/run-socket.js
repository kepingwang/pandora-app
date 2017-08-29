import io from 'socket.io-client';

export default function runSocket() {
  const socket = io();
  socket.on('connect', () => {
    console.log('client side sockets connects to a server');
  });
}
