import { fromJS } from 'immutable';
import {
  SET_SIGNUP_MESSAGE,
  SET_LOGIN_MESSAGE,
  SET_LOGGED_IN,
} from './actions';

const initialState = fromJS({
  signupMessage: null,
  loginMessage: null,
  loggedIn: false,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_MESSAGE:
      return state.set('signupMessage', action.message);
    case SET_LOGIN_MESSAGE:
      return state.set('loginMessage', action.message);
    case SET_LOGGED_IN:
      return state.set('loggedIn', action.isTrue);
    default:
      return state;
  }
};

export default reducers;
