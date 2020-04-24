import { TOGGLE_AUTH_MODAL } from './actions';
import { SIGN_IN } from '../../constants/authModalPages';

export const defaultStore = {
  open: false,
  page: SIGN_IN,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        open: action.open,
        page: action.page,
      };

    default:
      return state;
  }
};
