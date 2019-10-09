import { SET_AUTH_USER } from './actions';

export const defaultStore = {
  auth: null,
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
