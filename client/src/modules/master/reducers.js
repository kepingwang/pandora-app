import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  characters: [],
  description: null,
  gameRound: null,
  gameStatus: null,
  globalStats: {
    tension: null,
    violence: null,
  },
  paused: false,
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
