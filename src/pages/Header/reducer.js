import {
  TOGGLE_MOBILE_NAVIGATION,
  TOGGLE_HEADER_MODAL,
  SET_LOADING_SIGNUP_MODAL,
} from './actions';

export const defaultStore = {
  isMobileNavigationOpen: false,
  isHeaderModalOpen: false,
  headerModalName: '',
  signupModal: {
    loading: false,
  },
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_NAVIGATION:
      return {
        ...state,
        isMobileNavigationOpen: action.open,
      };

    case TOGGLE_HEADER_MODAL:
      return {
        ...state,
        isHeaderModalOpen: action.open,
        headerModalName: action.modalName,
      };

    case SET_LOADING_SIGNUP_MODAL:
      return {
        ...state,
        signupModal: {
          ...state.signupModal,
          loading: action.loading,
        },
      };

    default:
      return state;
  }
};
