import io from 'socket.io-client';
import store from './store';
import * as gameActions from './modules/game/actions';

const socket = io({ autoConnect: false });

socket.on('updateStatus', () => {
  store.dispatch(gameActions.syncGameInfo());
});

export default socket;
