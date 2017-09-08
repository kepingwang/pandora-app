import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  gameState: 'choosing-personalities',
  characterName: null,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CHARACTER_NAME:
      return state.set('characterName', action.characterName);
    default:
      return state;
  }
};

export default reducers;
