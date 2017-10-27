import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  gameName: null,
  description: null,
  story: null,
  goal: null,
  attrs: {
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
  stats: {
    affluence: null,
    influence: null,
    wellbeing: null,
    positiveCoins: null,
    negativeCoins: null,
    neutralCoins: null,
  },
  globalStats: {
    tension: null,
    violence: null,
  },
  event: {
    name: null,
    description: null,
  },
  gameStatus: 'choosing-attrs',
  availableActions: [],
  availableAttrs: {
    emotions: [],
    beliefs: [],
    personalities: [],
  },
  others: [],
  gameInfoSynced: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_GAME_INFO:
      return state.merge(action.gameInfo);
    default:
      return state;
  }
};

export default reducers;
