export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_LOCATION = 'SET_LOCATION';

export const setAuthUser = (authUser) => ({
  type: SET_AUTH_USER,
  authUser,
});

export const setLocation = (location) => ({
  type: SET_LOCATION,
  location,
});
