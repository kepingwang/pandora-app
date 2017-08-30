import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

function* handleSelectRoom(action) {
  const roomInfo = yield call(requests.getRoomInfo, action.roomName);
  yield put(actions.setRoomInfo(roomInfo));
  yield put(actions.setRoomName(action.roomName));
}

function* sagas() {
  yield takeLatest(actions.SELECT_ROOM, handleSelectRoom);
}

export default sagas;