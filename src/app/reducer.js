import { SET_AUTH_USER, SET_APPLICATION_SUBMITTED } from './actions';

export const defaultStore = {
  auth: JSON.parse(localStorage.getItem('authUser')),
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth: action.authUser,
      };

    case SET_APPLICATION_SUBMITTED: {
      return {
        ...state,
        auth: {
          ...state.auth,
          hasSubmittedApplication: action.hasSubmittedApplication,
        },
      };
    }

    default:
      return state;
  }
};
