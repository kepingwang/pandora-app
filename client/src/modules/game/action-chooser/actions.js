
export const CHOOSE_ACTION = 'action-chooser/choose-action';
export const chooseAction = actionName => ({
  type: CHOOSE_ACTION, actionName,
});

export const SET_ACTION_INFO = 'action-chooser/set-action-info';
export const setActionInfo = actionInfo => ({
  type: SET_ACTION_INFO, actionInfo,
});

export const SUBMIT_ACTION = 'action-chooser/submit-action';
export const submitAction = () => ({ // ready
  type: SUBMIT_ACTION,
});

export const NOT_READY = 'action-chooser/not-ready';
export const notReady = () => ({
  type: NOT_READY,
});

export const SET_READY = 'action-chooser/set-ready';
export const setReady = value => ({
  type: SET_READY, value,
});

export const RESET = 'action-chooser/reset';
export const reset = () => ({
  type: RESET,
});
