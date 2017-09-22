import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Game from './components/game';
import * as actions from './actions';
import { exitRoom, logout } from '../app/actions';

const mapStateToProps = state => ({
  status: state.game.get('status'),
  characterName: state.app.get('characterName'),
  stats: state.game.get('stats'),
});

const mapDispatchToProps = dispatch => ({
  syncGameInfo: () => {
    dispatch(actions.syncGameInfo());
  },
  exitRoom: () => {
    dispatch(exitRoom());
  },
  logout: () => {
    dispatch(logout());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
