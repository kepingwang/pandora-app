import io from 'socket.io-client';
import store from './store';
import * as gameActions from './modules/game/actions';
import * as actionChooserActions from './modules/game/action-chooser/actions';

const socket = io({ autoConnect: false });

socket.on('update-status', () => {
  store.dispatch(gameActions.syncGameInfo());
});

socket.on('reset-action-chooser', () => {
  store.dispatch(actionChooserActions.reset());
});

export default socket;
