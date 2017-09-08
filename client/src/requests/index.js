
const request = (url, payload) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

export const signup = ({ email, username, password }) =>
  request('/api/signup', { email, username, password });

export const login = ({ email, password }) =>
  request('/api/login', { email, password });

export const getRooms = () =>
  request('/api/get-rooms', {});

export const getRoomInfo = ({ roomName }) =>
  request('/api/get-room-info', { roomName });

export const joinRoom = ({ roomName, characterName }) =>
  request('/api/join-room', { roomName, characterName });

export const getStats = ({ characterName, roomName }) =>
  request('/api/get-stats', { characterName, roomName });

export const submitAction = ({ roomName, characterName, actionName, scope }) =>
  request('/api/submit-action', { roomName, characterName, actionName, scope });

export const getUserRoomCharacter = () =>
  request('/api/get-user-room-character', {});
