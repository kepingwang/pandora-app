import io from 'socket.io-client';
import store from './store';
import * as gameActions from './modules/game/actions';
import * as actionChooserActions from './modules/game/action-chooser/actions';
import * as attrsChooserActions from './modules/game/attrs-chooser/actions';

const socket = io({ autoConnect: false });

socket.on('sync-game-info', () => {
  store.dispatch(gameActions.syncGameInfo());
});

socket.on('reset-action-chooser', () => {
  store.dispatch(actionChooserActions.reset());
});

socket.on('reset-attrs-chooser', () => {
  store.dispatch(attrsChooserActions.notReady());
});

export default socket;
