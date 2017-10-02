import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../../requests';
import socket from '../../../socket';

const getGameName = state => state.game.get('gameName');
const getActionName = state => state.actionChooser.get('actionName');

function* handleChooseAction(action) {
  const gameName = yield select(getGameName);
  const actionName = action.actionName;
  const res = yield call(requests.getActionInfo, { gameName, actionName });
  const body = yield res.json();
  yield put(actions.setActionInfo(body));
}

function* handleSubmitAction() {
  const actionName = yield select(getActionName);
  socket.emit('action-ready', { actionName });
  yield put(actions.setReady(true));
}

function* handleNotReady() {
  socket.emit('action-not-ready');
  yield put(actions.setReady(false));
}

function* sagas() {
  yield takeLatest(actions.CHOOSE_ACTION, handleChooseAction);
  yield takeLatest(actions.SUBMIT_ACTION, handleSubmitAction);
  yield takeLatest(actions.NOT_READY, handleNotReady);
}

export default sagas;
