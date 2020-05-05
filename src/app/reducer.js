import { SET_AUTH_USER, SET_LOCATION } from './actions';
import { FALLBACK_LOCATION } from '../core/config';

export const defaultStore = {
  auth: JSON.parse(localStorage.getItem('authUser')),
  location: FALLBACK_LOCATION,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        auth: action.authUser,
      };

    case SET_LOCATION: {
      return {
        ...state,
        location: action.location,
      };
    }

    default:
      return state;
  }
};
