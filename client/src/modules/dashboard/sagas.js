import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';
import { setCharacterName, updateStats } from '../game/actions';


function* handleRetrieveUserRoomCharacter() {
  const res = yield call(requests.getUserRoomCharacter);
  const body = yield res.json();
  if (res.status !== 200) {
    console.log(body);
  }
  yield put(actions.setRoomName(body.roomName));
  yield put(setCharacterName(body.characterName));
  yield put(updateStats());
}

function* handleRetrieveRooms() {
  const res = yield call(requests.getRooms);
  const body = yield res.json();
  yield put(actions.setRooms(body));
}

function* handleSelectRoom(action) {
  const { roomName } = action;
  const res = yield call(requests.getRoomInfo, { roomName });
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
  yield takeLatest(actions.RETRIEVE_USER_ROOM_CHARACTER, handleRetrieveUserRoomCharacter);
  yield takeLatest(actions.RETRIEVE_ROOMS, handleRetrieveRooms);
  yield takeLatest(actions.SELECT_ROOM, handleSelectRoom);
  yield takeLatest(actions.JOIN_ROOM, handleJoinRoom);
}

export default sagas;
