import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

const getCharacterName = state => state.game.get('characterName');
const getRoomName = state => state.dashboard.get('roomName');

function* handleUpdateStats() {
  const characterName = yield select(getCharacterName);
  const roomName = yield select(getRoomName);
  const res = yield call(requests.getStats, { characterName, roomName });
  const body = yield res.json();
  yield put(actions.setStats(body.stats));
}

function* handleSubmitAction(action) {
  const characterName = yield select(getCharacterName);
  const roomName = yield select(getRoomName);
  const { actionName, scope } = action;
  const res = yield call(requests.submitAction, { roomName, characterName, actionName, scope });
  const body = yield res.json();
  yield put(actions.updateStats());
  console.log(body);
}

function* sagas() {
  yield takeLatest(actions.UPDATE_STATS, handleUpdateStats);
  yield takeLatest(actions.SUBMIT_ACTION, handleSubmitAction);
}

export default sagas;
