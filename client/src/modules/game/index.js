import { connect } from 'react-redux';
import Game from './components/game';
import * as actions from './actions';

const mapStateToProps = state => ({
  characterName: state.game.get('characterName'),
});

const mapDispatchToProps = dispatch => ({
  setCharacterName: (characterName) => {
    dispatch(actions.setCharacterName(characterName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
