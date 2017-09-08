import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dashboard from './components/dashboard';
import * as actions from './actions';

const mapStateToProps = state => ({
  rooms: state.dashboard.get('rooms'),
  roomName: state.dashboard.get('roomName'),
  roomInfo: state.dashboard.get('roomInfo'),
  joinRoomMessage: state.dashboard.get('joinRoomMessage'),
});

const mapDispatchToProps = dispatch => ({
  retrieveRooms: () => {
    dispatch(actions.retrieveRooms());
  },
  selectRoom: (roomName) => {
    dispatch(actions.selectRoom(roomName));
  },
  joinRoom: (roomName, characterName) => {
    dispatch(actions.joinRoom(roomName, characterName));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
