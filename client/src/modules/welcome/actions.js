
export const SIGNUP = 'welcome/signup';
export const signup = (email, username, password) => ({
  type: SIGNUP, email, username, password,
});

export const LOGIN = 'welcome/login';
export const login = (email, password) => ({
  type: LOGIN, email, password,
});

export const SET_SIGNUP_MESSAGE = 'welcome/set-signup-message';
export const setSignupMessage = message => ({
  type: SET_SIGNUP_MESSAGE, message,
});

export const SET_LOGIN_MESSAGE = 'welcome/set-login-message';
export const setLoginMessage = message => ({
  type: SET_LOGIN_MESSAGE, message,
});

export const SET_LOGGED_IN = 'welcome/set-logged-in';
export const setLoggedIn = isTrue => ({
  type: SET_LOGGED_IN, isTrue,
});

