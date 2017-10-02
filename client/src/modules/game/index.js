import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Game from './components/game';
import * as actions from './actions';
import { exitRoom, logout } from '../app/actions';

const mapStateToProps = state => ({
  characterName: state.app.get('characterName'),
  description: state.game.get('description'),
  stats: state.game.get('stats'),
  globalStats: state.game.get('globalStats'),
  event: state.game.get('event'),
  goal: state.game.get('goal'),
  story: state.game.get('story'),
  attrs: state.game.get('attrs'),
  others: state.game.get('others'),
  gameStatus: state.game.get('gameStatus'),
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
