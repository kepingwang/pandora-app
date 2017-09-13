import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as welcomeActions from '../welcome/actions';
import * as dashboardActions from '../dashboard/actions';
import * as requests from '../../requests';


const getMaster = state => state.app.get('master');
const getRoomName = state => state.dashboard.get('roomName');

function* handleFetchUserInfo() {
  const isLoggedInRes = yield call(requests.isLoggedIn);
  const isLoggedIn = yield isLoggedInRes.json();
  if (!isLoggedIn.result) {
    yield put(actions.setUserInfo({}));
    return;
  }
  const userInfoRes = yield call(requests.getUserInfo);
  const userInfo = yield userInfoRes.json();
  const {
    email, username, master, roomName, characterName,
  } = userInfo;
  yield put(actions.setUserInfo({
    email, username, master, roomName, characterName,
  }));
}

function* handleSignup({ email, username, password }) {
  const res = yield call(requests.signup, { email, username, password });
  const body = yield res.json();
  if (res.status === 200) {
    yield put(welcomeActions.setSignupMessage(null));
    yield put(actions.fetchUserInfo());
  } else {
    yield put(welcomeActions.setSignupMessage(body.message));
  }
}

function* handleLogin({ email, password }) {
  const res = yield call(requests.login, { email, password });
  const body = yield res.json();
  if (res.status === 200) {
    yield put(welcomeActions.setLoginMessage(null));
    yield put(actions.fetchUserInfo());
  } else {
    yield put(welcomeActions.setLoginMessage(body.message));
  }
}

function* handleLogout() {
  yield call(requests.logout);
  yield put(actions.fetchUserInfo());
}

function* handleJoinRoom({ roomName, characterName, token }) {
  const master = yield select(getMaster);
  let res = null;
  if (master) {
    res = yield call(requests.masterJoinRoom, { roomName });
  } else {
    res = yield call(requests.joinRoom, { roomName, characterName, token });
  }
  const body = yield res.json();
  if (res.status === 200) {
    yield put(dashboardActions.setJoinRoomMessage({ message: null }));
    yield put(actions.fetchUserInfo());
  } else {
    yield put(dashboardActions.selectRoom({ roomName }));
    yield put(dashboardActions.setJoinRoomMessage({ message: body.message }));
  }
}

function* handleExitRoom() {
  yield call(requests.exitRoom);
  yield put(actions.fetchUserInfo());
  const roomName = yield select(getRoomName);
  yield put(dashboardActions.selectRoom({ roomName }));
}

function* sagas() {
  yield takeLatest(actions.FETCH_USER_INFO, handleFetchUserInfo);
  yield takeLatest(actions.SIGNUP, handleSignup);
  yield takeLatest(actions.LOGIN, handleLogin);
  yield takeLatest(actions.LOGOUT, handleLogout);
  yield takeLatest(actions.JOIN_ROOM, handleJoinRoom);
  yield takeLatest(actions.EXIT_ROOM, handleExitRoom);
}

export default sagas;
