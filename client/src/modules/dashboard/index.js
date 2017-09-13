import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dashboard from './dashboard';
import * as actions from './actions';
import * as appActions from '../app/actions';

const mapStateToProps = state => ({
  rooms: state.dashboard.get('rooms'),
  roomName: state.dashboard.get('roomName'),
  roomDescription: state.dashboard.get('roomDescription'),
  roomCharacters: state.dashboard.get('roomCharacters'),
  joinRoomMessage: state.dashboard.get('joinRoomMessage'),
});

const mapDispatchToProps = dispatch => ({
  fetchRooms: () => {
    dispatch(actions.fetchRooms());
  },
  selectRoom: ({ roomName }) => {
    dispatch(actions.selectRoom({ roomName }));
  },
  joinRoom: ({ roomName, characterName, token }) => {
    dispatch(appActions.joinRoom({ roomName, characterName, token }));
  },
  logout: () => {
    dispatch(appActions.logout());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
