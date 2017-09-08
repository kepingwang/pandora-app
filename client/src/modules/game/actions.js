
export const SET_CHARACTER_NAME = 'game/set-character-name';
export const setCharacterName = characterName => ({
  type: SET_CHARACTER_NAME, characterName,
});

export const UPDATE_STATS = 'game/update-stats';
export const updateStats = () => ({
  type: UPDATE_STATS,
});

export const SET_STATS = 'game/set-stats';
export const setStats = stats => ({
  type: SET_STATS, stats,
});

export const SUBMIT_ACTION = 'action-chooser/submit-action';
export const submitAction = ({ actionName, scope }) => ({
  type: SUBMIT_ACTION, actionName, scope,
});

