import { SET_SOCIAL_MEDIA_DETAILS } from './actions';

export const defaultStore = {};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_SOCIAL_MEDIA_DETAILS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
