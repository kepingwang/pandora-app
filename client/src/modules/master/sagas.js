import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

const getStatus = state => state.master.get('status');
const getRoomName = state => state.app.get('roomName');

function* handleSyncGameInfo() {
  const roomName = yield select(getRoomName);
  const res = yield call(requests.masterGetGameInfo, { roomName });
  const { status } = yield res.json();
  yield put(actions.setGameInfo({
    status,
  }));
}

function* handleUpdateGameStatus(action) {
  const status = action.status;
  const currStatus = yield select(getStatus);
  if (status === currStatus) {
    return;
  }
  const roomName = yield select(getRoomName);
  yield call(requests.masterUpdateGameStatus, { roomName, status });
  yield put(actions.syncGameInfo());
}


function* sagas() {
  yield takeLatest(actions.SYNC_GAME_INFO, handleSyncGameInfo);
  yield takeLatest(actions.UPDATE_GAME_STATUS, handleUpdateGameStatus);
}

export default sagas;
