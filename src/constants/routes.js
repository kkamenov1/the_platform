export const LANDING = '/';
export const PROFILE = '/profile';
export const DASHBOARD = '/dashboard';

export const LOGIN_BTN_NAME = 'Log in';
export const SIGNUP_BTN_NAME = 'Sign up';
export const HELP_BTN_NAME = 'Help';
export const BECOMEAGURU_BTN_NAME = 'Become a GURU';
export const HOME_BTN_NAME = 'Home';
export const FORGOT_PASSWORD_BTN_NAME = 'Forgot password?';
export const POST_SIGNUP = 'POST_SIGNUP';

export const PROFILE_BTN_NAME = 'Profile';
export const DASHBOARD_BTN_NAME = 'Dashboard';
export const LOGOUT_BTN_NAME = 'Log Out';

export const NavigationRoutes = [
  {
    name: HOME_BTN_NAME,
    path: LANDING,
    shouldHideOnAuth: false,
  },
  {
    name: BECOMEAGURU_BTN_NAME,
    shouldHideOnAuth: false,
  },
  {
    name: HELP_BTN_NAME,
    shouldHideOnAuth: false,
  },
  {
    name: SIGNUP_BTN_NAME,
    shouldHideOnAuth: true,
  },
  {
    name: LOGIN_BTN_NAME,
    shouldHideOnAuth: true,
  },
];
