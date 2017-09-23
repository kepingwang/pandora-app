import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

const getCharacterName = state => state.app.get('characterName');
const getRoomName = state => state.app.get('roomName');

function* handleSyncGameInfo() {
  const characterName = yield select(getCharacterName);
  const roomName = yield select(getRoomName);
  const res = yield call(requests.getGameInfo, { roomName, characterName });
  const { status } = yield res.json();
  yield put(actions.setGameInfo({
    status,
  }));
}

function* handleSubmitAction(action) {
  // const characterName = yield select(getCharacterName);
  // const roomName = yield select(getRoomName);
  // const { actionName, scope } = action;
  // const res = yield call(requests.submitAction, { roomName, characterName, actionName, scope });
  // const body = yield res.json();
  // yield put(actions.syncGameInfo());
}

function* sagas() {
  yield takeLatest(actions.SYNC_GAME_INFO, handleSyncGameInfo);
  yield takeLatest(actions.SUBMIT_ACTION, handleSubmitAction);
}

export default sagas;
