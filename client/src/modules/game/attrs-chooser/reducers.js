import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  remainingPoints: 10,
  attrsChosen: {
    emotions: [
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
    ],
    beliefs: [
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
    ],
    personalities: [
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
      { name: null, intensity: 0 },
    ],
  },
  ready: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHOOSE_ATTRS:
      return state.merge({
        attrsChosen: action.attrs,
      });
    case actions.SET_REMAINING_POINTS:
      return state.set('remainingPoints', action.remainingPoints);
    case actions.SET_READY:
      return state.set('ready', action.value);
    case actions.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducers;
