import { TOGGLE_AUTH_MODAL } from './actions';

export const defaultStore = {
  open: false,
  page: '',
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
