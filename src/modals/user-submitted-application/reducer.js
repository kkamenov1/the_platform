import {
  TOGGLE_USER_SUBMITTED_APPLICATION_MODAL,
} from './actions';

export const defaultStore = {
  open: false,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case TOGGLE_USER_SUBMITTED_APPLICATION_MODAL:
      return {
        ...state,
        open: action.open,
      };

    default:
      return state;
  }
};
