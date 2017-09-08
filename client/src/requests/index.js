
export const signup = (email, username, password) =>
  fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, username, password }),
  });

export const login = (email, password) =>
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

export const getRooms = () =>
  fetch('/api/get-rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

export const getRoomInfo = roomName =>
  fetch('/api/get-room-info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomName }),
    credentials: 'include',
  });

export const joinRoom = ({ roomName, characterName }) =>
  fetch('/api/join-room', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomName, characterName }),
    credentials: 'include',
  });
