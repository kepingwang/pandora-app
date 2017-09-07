import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';

function* handleSignup({ email, username, password }) {
  const res = yield call(requests.signup, email, username, password);
  const body = yield res.json();
  console.log(body);
  if (res.status === 200) {
    yield put(actions.setSignupMessage(body.message));
    yield put(actions.setLoggedIn(true));
  } else {
    yield put(actions.setSignupMessage(body.message));
  }
}

function* handleLogin({ email, password }) {
  const res = yield call(requests.login, email, password);
  const body = yield res.json();
  console.log(body);
  if (res.status === 200) {
    yield put(actions.setLoginMessage(body.message));
    yield put(actions.setLoggedIn(true));

  } else {
    yield put(actions.setLoginMessage(body.message));
  }
}

function* sagas() {
  yield takeLatest(actions.SIGNUP, handleSignup);
  yield takeLatest(actions.LOGIN, handleLogin);
}

export default sagas;
