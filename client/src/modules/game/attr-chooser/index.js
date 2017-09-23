import { connect } from 'react-redux';
import AttrChooser from './components/attr-chooser';
import * as actions from './actions';

const mapStateToProps = state => ({
  ready: state.attrChooser.get('ready'),
});

const mapDispatchToProps = dispatch => ({
  submitAttr: (attr) => {
    dispatch(actions.submitAttr(attr));
  },
  notReady: () => {
    dispatch(actions.notReady());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AttrChooser);
