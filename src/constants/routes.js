export const LANDING = '/';
export const JOIN_US = '/join-us';
export const HELP = '/help';
export const SIGNUP = '/signup';
export const LOGIN = '/login';

export const LOGIN_BTN_NAME = 'Log in';
export const SIGNUP_BTN_NAME = 'Sign up';
export const HELP_BTN_NAME = 'Help';
export const BECOMEATRAINER_BTN_NAME = 'Become a trainer';
export const HOME_BTN_NAME = 'Home';
export const FORGOT_PASSWORD_BTN_NAME = 'Forgot password?';

export const NavigationRoutes = [
  {
    name: HOME_BTN_NAME,
    path: LANDING,
  },
  {
    name: BECOMEATRAINER_BTN_NAME,
    path: JOIN_US,
  },
  {
    name: HELP_BTN_NAME,
    path: HELP,
  },
  {
    name: SIGNUP_BTN_NAME,
    path: SIGNUP,
  },
  {
    name: LOGIN_BTN_NAME,
    path: LOGIN,
  },
];
