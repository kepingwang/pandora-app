import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import socket from '../../../socket';

function* handleSubmitAttrs(action) {
  socket.emit('attrs-ready', action.attrs.toJS());
  yield put(actions.setReady(true));
}

function* handleNotReady() {
  socket.emit('attrs-not-ready');
  yield put(actions.setReady(false));
}

function* sagas() {
  yield takeLatest(actions.SUBMIT_ATTRS, handleSubmitAttrs);
  yield takeLatest(actions.NOT_READY, handleNotReady);
}

export default sagas;
