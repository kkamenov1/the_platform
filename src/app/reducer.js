import { SET_AUTH_USER } from './actions';

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

    default:
      return state;
  }
};
