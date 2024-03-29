export const LANDING = '/';
export const PROFILE = '/profile';
export const DASHBOARD = '/dashboard';
export const ADMIN = '/admin';
export const LISTING = '/gurus';
export const GDP = '/gurus/:guruID';
export const WRITE_REVIEW = '/gurus/:guruID/write-review';
export const BECOME_GURU = '/become-guru';
export const BECOME_GURU_APPLY = '/become-guru/apply';
export const NOT_FOUND = '/404';

export const NavigationRoutes = [
  {
    name: 'Home',
    path: LANDING,
  },
  {
    name: 'Become a GURU',
  },
  {
    name: 'Help',
  },
  {
    name: 'Sign up',
  },
  {
    name: 'Log in',
  },
];
