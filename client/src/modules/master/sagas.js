import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

const getRoomName = state => state.app.get('roomName');

function* handleSyncGameInfo() {
  const roomName = yield select(getRoomName);
  const res = yield call(requests.masterGetRoomInfo, { roomName });
  const body = yield res.json();
  yield put(actions.setGameInfo(body));
}

function* sagas() {
  yield takeLatest(actions.SYNC_GAME_INFO, handleSyncGameInfo);
}

export default sagas;
