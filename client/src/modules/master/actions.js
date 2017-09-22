
export const SYNC_GAME_INFO = 'master/sync-game-info';
export const syncGameInfo = () => ({
  type: SYNC_GAME_INFO,
});

export const SET_GAME_INFO = 'master/set-game-info';
export const setGameInfo = ({ status }) => ({
  type: SET_GAME_INFO, status,
});

export const UPDATE_GAME_STATUS = 'master/update-game-status';
export const updateGameStatus = status => ({
  type: UPDATE_GAME_STATUS, status,
});
