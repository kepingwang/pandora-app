import { connect } from 'react-redux';
import ActionChooser from './components/action-chooser';
import * as actions from './actions';

const mapStateToProps = state => ({
  availableActions: state.game.get('availableActions'),
  positiveCoins: state.game.getIn(['stats', 'positiveCoins']),
  neutralCoins: state.game.getIn(['stats', 'neutralCoins']),
  negativeCoins: state.game.getIn(['stats', 'negativeCoins']),
  actionName: state.actionChooser.get('actionName'),
  description: state.actionChooser.get('description'),
  emotionType: state.actionChooser.get('emotionType'),
  scope: state.actionChooser.get('scope'),
  ready: state.actionChooser.get('ready'),
});

const mapDispatchToProps = dispatch => ({
  chooseAction: (actionName) => {
    dispatch(actions.chooseAction(actionName));
  },
  submitAction: () => {
    dispatch(actions.submitAction());
  },
  notReady: () => {
    dispatch(actions.notReady());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChooser);
