import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';
import { setCharacterName } from '../game/actions';

function* handleRetrieveRooms() {
  const res = yield call(requests.getRooms);
  const body = yield res.json();
  yield put(actions.setRooms(body));
}

function* handleSelectRoom(action) {
  const res = yield call(requests.getRoomInfo, action.roomName);
  const body = yield res.json();
  if (res.status === 200) {
    yield put(actions.setRoomInfo(body));
    yield put(actions.setRoomName(body.roomName));
  } else {
    console.log('you are not authenticated to see this');
  }
}

function* handleJoinRoom(action) {
  const res = yield call(requests.joinRoom, action);
  const body = yield res.json();
  if (res.status === 200) {
    yield put(setCharacterName(action.characterName));
  } else {
    yield put(actions.setJoinRoomMessage(body.message));
  }
}

function* sagas() {
  yield takeLatest(actions.RETRIEVE_ROOMS, handleRetrieveRooms);
  yield takeLatest(actions.SELECT_ROOM, handleSelectRoom);
  yield takeLatest(actions.JOIN_ROOM, handleJoinRoom);
}

export default sagas;
