
export const SET_SIGNUP_MESSAGE = 'welcome/set-signup-message';
export const setSignupMessage = message => ({
  type: SET_SIGNUP_MESSAGE, message,
});

export const SET_LOGIN_MESSAGE = 'welcome/set-login-message';
export const setLoginMessage = message => ({
  type: SET_LOGIN_MESSAGE, message,
});
