
export const RETRIEVE_ROOMS = 'dashboard/retrieve-rooms';
export const retrieveRooms = () => ({
  type: RETRIEVE_ROOMS,
});

export const SET_ROOMS = 'dashboard/set-rooms';
export const setRooms = rooms => ({
  type: SET_ROOMS, rooms,
});

export const SELECT_ROOM = 'dashboard/select-room';
export const selectRoom = roomName => ({
  type: SELECT_ROOM, roomName,
});

export const SET_ROOM_NAME = 'dashboard/set-room-name';
export const setRoomName = roomName => ({
  type: SET_ROOM_NAME, roomName,
});

export const SET_ROOM_INFO = 'dashboard/set-room-info';
export const setRoomInfo = roomInfo => ({
  type: SET_ROOM_INFO, roomInfo,
});

export const JOIN_ROOM = 'dashboard/join-room';
export const joinRoom = (roomName, characterName) => ({
  type: JOIN_ROOM, roomName, characterName,
});

export const SET_JOIN_ROOM_MESSAGE = 'dashboard/set-join-room-message';
export const setJoinRoomMessage = message => ({
  type: SET_JOIN_ROOM_MESSAGE, message,
});
