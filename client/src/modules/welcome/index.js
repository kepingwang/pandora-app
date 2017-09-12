import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Welcome from './components/welcome';
import * as appActions from '../app/actions';

const mapStateToProps = state => ({
  signupMessage: state.welcome.get('signupMessage'),
  loginMessage: state.welcome.get('loginMessage'),
});

const mapDispatchToProps = dispatch => ({
  signup: (email, username, password) => {
    dispatch(appActions.signup(email, username, password));
  },
  login: (email, password) => {
    dispatch(appActions.login(email, password));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
