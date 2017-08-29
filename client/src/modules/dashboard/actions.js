
export const SELECT_ROOM = 'dashboard/select-room';
export const selectRoom = roomName => ({
  type: SELECT_ROOM,
  roomName,
});

export const SET_ROOM_NAME = 'dashboard/set-room-name';
export const setRoomName = roomName => ({
  type: SET_ROOM_NAME,
  roomName,
});

export const SET_ROOM_INFO = 'dashboard/set-room-info';
export const setRoomInfo = roomInfo => ({
  type: SET_ROOM_INFO,
  roomInfo,
});
