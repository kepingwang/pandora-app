import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Master from './components/master';
import * as actions from './actions';
import * as appActions from '../app/actions';


const mapStateToProps = state => ({
  status: state.master.get('status'),
});

const mapDispatchToProps = dispatch => ({
  syncGameInfo: () => {
    dispatch(actions.syncGameInfo());
  },
  updateGameStatus: (status) => {
    dispatch(actions.updateGameStatus(status));
  },
  exitRoom: () => {
    dispatch(appActions.exitRoom());
  },
  logout: () => {
    dispatch(appActions.logout());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
