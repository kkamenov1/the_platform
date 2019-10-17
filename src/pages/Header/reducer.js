import {
  TOGGLE_MOBILE_NAVIGATION,
  TOGGLE_HEADER_MODAL,
  SET_LOADING_SIGNUP_MODAL,
  SET_LOADING_SIGNIN_MODAL,
  SET_LOADING_RESET_PASSWORD_MODAL,
} from './actions';

export const defaultStore = {
  isMobileNavigationOpen: false,
  isHeaderModalOpen: false,
  headerModalName: '',
  signUpModal: {
    loading: false,
  },
  signInModal: {
    loading: false,
  },
  forgotPasswordModal: {
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
        signUpModal: {
          ...state.signUpModal,
          loading: action.loading,
        },
      };

    case SET_LOADING_SIGNIN_MODAL:
      return {
        ...state,
        signInModal: {
          ...state.signInModal,
          loading: action.loading,
        },
      };


    case SET_LOADING_RESET_PASSWORD_MODAL:
      return {
        ...state,
        forgotPasswordModal: {
          ...state.forgotPasswordModal,
          loading: action.loading,
        },
      };

    default:
      return state;
  }
};
