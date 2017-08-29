import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  roomName: null,
  roomInfo: null,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ROOM_NAME:
      return state.set('roomName', action.roomName);
    case actions.SET_ROOM_INFO:
      return state.set('roomInfo', action.roomInfo);
    default:
      return state;
  }
};

export default reducers;
