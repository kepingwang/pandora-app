import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  status: 'actions',
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_GAME_INFO:
      return state.merge({
        status: action.status,
      });
    default:
      return state;
  }
};

export default reducers;
