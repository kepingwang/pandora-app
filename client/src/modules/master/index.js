import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Master from './master';
import * as appActions from '../app/actions';


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  exitRoom: () => {
    dispatch(appActions.exitRoom());
  },
  logout: () => {
    dispatch(appActions.logout());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
