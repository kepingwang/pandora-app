import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';
import App from './app';

const mapStateToProps = state => ({
  loading: state.app.get('loading'),
  email: state.app.get('email'),
  username: state.app.get('username'),
  master: state.app.get('master'),
  roomName: state.app.get('roomName'),
  characterName: state.app.get('characterName'),
});

const mapDispatchToProps = dispatch => ({
  fetchUserInfo: () => {
    dispatch(actions.fetchUserInfo());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
