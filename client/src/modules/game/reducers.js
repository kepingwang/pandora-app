import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  gameState: 'choosing-personalities',
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducers;
