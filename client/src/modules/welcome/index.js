import { connect } from 'react-redux';
import Welcome from './components/welcome';
import * as actions from './actions';

const mapStateToProps = state => ({
  signupMessage: state.welcome.get('signupMessage'),
  loginMessage: state.welcome.get('loginMessage'),
});

const mapDispatchToProps = dispatch => ({
  signup: (email, username, password) => {
    dispatch(actions.signup(email, username, password));
  },
  login: (email, password) => {
    dispatch(actions.login(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
