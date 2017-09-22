
export const SYNC_GAME_INFO = 'game/sync-game-info';
export const syncGameInfo = () => ({
  type: SYNC_GAME_INFO,
});

export const SET_GAME_INFO = 'game/set-game-info';
export const setGameInfo = ({ status }) => ({
  type: SET_GAME_INFO, status,
});

export const SUBMIT_ACTION = 'action-chooser/submit-action';
export const submitAction = ({ actionName, scope }) => ({
  type: SUBMIT_ACTION, actionName, scope,
});

