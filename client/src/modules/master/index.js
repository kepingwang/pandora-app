import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Master from './components/master';
import * as actions from './actions';
import * as appActions from '../app/actions';


const mapStateToProps = state => ({
  roomName: state.app.get('roomName'),
  characters: state.master.get('characters'),
  description: state.master.get('description'),
  gameRound: state.master.get('gameRound'),
  gameStatus: state.master.get('gameStatus'),
  globalStats: state.master.get('globalStats'),
  paused: state.master.get('paused'),
});

const mapDispatchToProps = dispatch => ({
  syncGameInfo: () => {
    dispatch(actions.syncGameInfo());
  },
  exitRoom: () => {
    dispatch(appActions.exitRoom());
  },
  logout: () => {
    dispatch(appActions.logout());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
