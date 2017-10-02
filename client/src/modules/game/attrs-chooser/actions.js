
export const CHOOSE_ATTRS = 'attrs-chooser/choose-attrs';
export const chooseAttrs = attrs => ({
  type: CHOOSE_ATTRS, attrs,
});

export const SET_REMAINING_POINTS = 'attrs-chooser/set-remaining-points';
export const setRemainingPoints = remainingPoints => ({
  type: SET_REMAINING_POINTS, remainingPoints,
});

export const SUBMIT_ATTRS = 'attrs-chooser/submit-attrs';
export const submitAttrs = attrs => ({ // ready
  type: SUBMIT_ATTRS, attrs,
});

export const NOT_READY = 'attrs-chooser/not-ready';
export const notReady = () => ({
  type: NOT_READY,
});

export const SET_READY = 'attrs-chooser/set-ready';
export const setReady = value => ({
  type: SET_READY, value,
});

export const RESET = 'attrs-chooser/reset';
export const reset = () => ({
  type: RESET,
});
