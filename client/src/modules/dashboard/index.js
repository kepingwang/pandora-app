import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dashboard from './components/dashboard';
import * as actions from './actions';

const mapStateToProps = state => ({
  roomName: state.dashboard.get('roomName'),
  roomInfo: state.dashboard.get('roomInfo'),
});

const mapDispatchToProps = dispatch => ({
  selectRoom: (roomName) => {
    dispatch(actions.selectRoom(roomName));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
