import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  actionName: null,
  description: null,
  emotionType: null,
  scope: null,
  ready: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ACTION_INFO:
      return state.merge(action.actionInfo);
    case actions.SET_READY:
      return state.set('ready', action.value);
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducers;
