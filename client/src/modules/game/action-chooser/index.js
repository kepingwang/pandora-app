import { connect } from 'react-redux';
import ActionChooser from './components/action-chooser';
import * as actions from './actions';

const mapStateToProps = state => ({
  actionChosen: state.actionChooser.get('actionChosen'),
  scope: state.actionChooser.get('scope'),
  ready: state.actionChooser.get('ready'),
});

const mapDispatchToProps = dispatch => ({
  chooseAction: (actionName) => {
    dispatch(actions.chooseAction(actionName));
  },
  chooseScope: (scope) => {
    dispatch(actions.chooseScope(scope));
  },
  submitAction: () => {
    dispatch(actions.submitAction());
  },
  notReady: () => {
    dispatch(actions.notReady());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChooser);
