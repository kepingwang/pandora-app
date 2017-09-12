import { fromJS } from 'immutable';
import * as actions from './actions';

const initialState = fromJS({
  signupMessage: null,
  loginMessage: null,
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SIGNUP_MESSAGE:
      return state.set('signupMessage', action.message);
    case actions.SET_LOGIN_MESSAGE:
      return state.set('loginMessage', action.message);
    default:
      return state;
  }
};

export default reducers;
