import { select, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import socket from '../../../socket';

const getActionChosen = state => state.actionChooser.get('actionChosen');
const getScope = state => state.actionChooser.get('scope');

function* handleSubmitAction() {
  const actionName = yield select(getActionChosen);
  const scope = yield select(getScope);
  socket.emit('action-ready', { actionName, scope });
  yield put(actions.setReady(true));
}

function* handleNotReady() {
  socket.emit('action-not-ready');
  yield put(actions.setReady(false));
}

function* sagas() {
  yield takeLatest(actions.SUBMIT_ACTION, handleSubmitAction);
  yield takeLatest(actions.NOT_READY, handleNotReady);
}

export default sagas;
