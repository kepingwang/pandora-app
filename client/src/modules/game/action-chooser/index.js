import { connect } from 'react-redux';
import ActionChooser from './components/action-chooser';
import * as actions from '../actions';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  submitAction: ({ actionName, scope }) => {
    dispatch(actions.submitAction({ actionName, scope }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChooser);
