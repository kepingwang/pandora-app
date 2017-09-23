import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import socket from '../../../socket';

function* handleSubmitAttr(action) {
  console.log(action);
  socket.emit('attr-ready', action.attr.toJS());
  yield put(actions.setReady(true));
}

function* handleNotReady() {
  socket.emit('attr-not-ready');
  yield put(actions.setReady(false));
}

function* sagas() {
  yield takeLatest(actions.SUBMIT_ATTR, handleSubmitAttr);
  yield takeLatest(actions.NOT_READY, handleNotReady);
}

export default sagas;
