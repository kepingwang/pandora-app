import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  rooms: [],
  roomName: null,
  roomCharacters: null,
  joinRoomMessage: null,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ROOMS:
      return state.merge({
        rooms: action.rooms,
      });
    case actions.SET_ROOM_INFO:
      return state.merge({
        roomName: action.roomName,
        roomCharacters: action.roomCharacters,
      });
    case actions.SET_JOIN_ROOM_MESSAGE:
      return state.set('joinRoomMessage', action.message);
    default:
      return state;
  }
};

export default reducers;
