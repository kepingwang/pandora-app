
export const FETCH_ROOMS = 'dashboard/fetch-rooms';
export const fetchRooms = () => ({
  type: FETCH_ROOMS,
});

export const SET_ROOMS = 'dashboard/set-rooms';
export const setRooms = ({ rooms }) => ({
  type: SET_ROOMS, rooms,
});

export const SELECT_ROOM = 'dashboard/select-room';
export const selectRoom = ({ roomName }) => ({
  type: SELECT_ROOM, roomName,
});

export const SET_ROOM_INFO = 'dashboard/set-room-info';
export const setRoomInfo = ({ roomName, description, characters }) => ({
  type: SET_ROOM_INFO, roomName, description, characters,
});

export const SET_JOIN_ROOM_MESSAGE = 'dashboard/set-join-room-message';
export const setJoinRoomMessage = ({ message }) => ({
  type: SET_JOIN_ROOM_MESSAGE, message,
});
