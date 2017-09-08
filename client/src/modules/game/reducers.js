import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  gameState: 'choosing-personalities',
  characterName: null,
  stats: {},
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CHARACTER_NAME:
      return state.set('characterName', action.characterName);
    case actions.SET_STATS:
      return state.merge({
        stats: action.stats,
      });
    default:
      return state;
  }
};

export default reducers;
