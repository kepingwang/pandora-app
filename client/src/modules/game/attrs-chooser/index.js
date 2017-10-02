import { connect } from 'react-redux';
import AttrsChooser from './components/attrs-chooser';
import * as actions from './actions';

const mapStateToProps = state => ({
  availableAttrs: state.game.get('availableAttrs'),
  remainingPoints: state.attrsChooser.get('remainingPoints'),
  attrsChosen: state.attrsChooser.get('attrsChosen'),
  ready: state.attrsChooser.get('ready'),
});

const mapDispatchToProps = dispatch => ({
  chooseAttrs: (attrs) => {
    dispatch(actions.chooseAttrs(attrs));
  },
  setRemainingPoints: (remainingPoints) => {
    dispatch(actions.setRemainingPoints(remainingPoints));
  },
  submitAttrs: (attrs) => {
    dispatch(actions.submitAttrs(attrs));
  },
  notReady: () => {
    dispatch(actions.notReady());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttrsChooser);
