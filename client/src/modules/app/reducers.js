import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  loading: true,
  email: null,
  username: null,
  master: null,
  roomName: null,
  characterName: null,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER_INFO:
      return state.merge({
        loading: false,
        email: action.email,
        username: action.username,
        master: action.master,
        roomName: action.roomName,
        characterName: action.characterName,
      });
    default:
      return state;
  }
};

export default reducers;
