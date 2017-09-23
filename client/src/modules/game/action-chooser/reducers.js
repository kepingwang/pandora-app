import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  actionChosen: null,
  scope: 'private',
  ready: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_ACTION:
      return state.set('actionChosen', action.actionName);
    case actions.CHOOSE_SCOPE:
      return state.set('scope', action.scope);
    case actions.SET_READY:
      return state.set('ready', action.value);
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducers;
