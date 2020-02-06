export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_APPLICATION_SUBMITTED = 'SET_APPLICATION_SUBMITTED';

export const setAuthUser = (authUser) => ({
  type: SET_AUTH_USER,
  authUser,
});

export const setApplicationSubmitted = (hasSubmittedApplication) => ({
  type: SET_APPLICATION_SUBMITTED,
  hasSubmittedApplication,
});
