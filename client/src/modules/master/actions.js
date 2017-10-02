
export const SYNC_GAME_INFO = 'master/sync-game-info';
export const syncGameInfo = () => ({
  type: SYNC_GAME_INFO,
});

export const SET_GAME_INFO = 'master/set-game-info';
export const setGameInfo = gameInfo => ({
  type: SET_GAME_INFO, gameInfo,
});
