import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  signupMessage: null,
  loginMessage: null,
  loggedIn: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SIGNUP_MESSAGE:
      return state.set('signupMessage', action.message);
    case actions.SET_LOGIN_MESSAGE:
      return state.set('loginMessage', action.message);
    case actions.SET_LOGGED_IN:
      return state.set('loggedIn', action.isTrue);
    default:
      return state;
  }
};

export default reducers;
