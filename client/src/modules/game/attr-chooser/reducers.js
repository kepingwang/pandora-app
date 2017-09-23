import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  ready: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_READY:
      return state.set('ready', action.value);
    default:
      return state;
  }
};

export default reducers;
