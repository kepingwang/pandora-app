
export const SUBMIT_ATTR = 'attr-chooser/submit-attr';
export const submitAttr = attr => ({
  type: SUBMIT_ATTR, attr,
});

export const NOT_READY = 'attr-chooser/not-ready';
export const notReady = () => ({
  type: NOT_READY,
});

export const SET_READY = 'attr-chooser/set-ready';
export const setReady = value => ({
  type: SET_READY, value,
});
