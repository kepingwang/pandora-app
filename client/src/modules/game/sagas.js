import { select, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as requests from '../../requests';
import * as attrsChooserActions from './attrs-chooser/actions';
import * as actionChooserActions from './action-chooser/actions';

const getRoomName = state => state.app.get('roomName');

function* handleSyncGameInfo() {
  const roomName = yield select(getRoomName);
  const res = yield call(requests.getGameInfo, { roomName });
  const body = yield res.json();
  yield put(attrsChooserActions.reset());
  yield put(actionChooserActions.reset());
  yield put(actions.setGameInfo(Object.assign(
    {}, body, { gameInfoSynced: true }),
  ));
}

function* sagas() {
  yield takeLatest(actions.SYNC_GAME_INFO, handleSyncGameInfo);
}

export default sagas;
