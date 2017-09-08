import { connect } from 'react-redux';
import Game from './components/game';
import * as actions from './actions';

const mapStateToProps = state => ({
  characterName: state.game.get('characterName'),
  stats: state.game.get('stats'),
});

const mapDispatchToProps = dispatch => ({
  setCharacterName: (characterName) => {
    dispatch(actions.setCharacterName(characterName));
  },
  updateStats: () => {
    dispatch(actions.updateStats());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
