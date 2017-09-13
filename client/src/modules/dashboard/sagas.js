import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

function* handleFetchRooms() {
  const res = yield call(requests.getRooms);
  const body = yield res.json();
  yield put(actions.setRooms({ rooms: body }));
}

function* handleSelectRoom({ roomName }) {
  if (!roomName) {
    return;
  }
  const res = yield call(requests.getRoomInfo, { roomName });
  const body = yield res.json();
  yield put(actions.setRoomInfo(body));
}

function* sagas() {
  yield takeLatest(actions.FETCH_ROOMS, handleFetchRooms);
  yield takeLatest(actions.SELECT_ROOM, handleSelectRoom);
}

export default sagas;
