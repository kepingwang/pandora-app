

export const FETCH_USER_INFO = 'app/fetch-user-info';
export const fetchUserInfo = () => ({
  type: FETCH_USER_INFO,
});

export const SET_USER_INFO = 'app/set-user-info';
export const setUserInfo =
  ({ email, username, master, roomName, characterName }) => ({
    type: SET_USER_INFO, email, username, master, roomName, characterName,
  });

export const SIGNUP = 'app/signup';
export const signup = (email, username, password) => ({
  type: SIGNUP, email, username, password,
});

export const LOGIN = 'app/login';
export const login = (email, password) => ({
  type: LOGIN, email, password,
});

export const LOGOUT = 'app/logout';
export const logout = () => ({
  type: LOGOUT,
});

export const JOIN_ROOM = 'app/join-room';
export const joinRoom = (roomName, characterName) => ({
  type: JOIN_ROOM, roomName, characterName,
});

export const EXIT_ROOM = 'app/exit-room';
export const exitRoom = () => ({
  type: EXIT_ROOM,
});
