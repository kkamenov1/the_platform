import {
  TOGGLE_MOBILE_NAVIGATION,
  TOGGLE_HEADER_MODAL,
  SET_LOADING_SIGNUP_MODAL,
  SET_LOADING_SIGNIN_MODAL,
  SET_LOADING_RESET_PASSWORD_MODAL,
  SET_GURU_PHOTOS,
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
  becomeGuruModal: {
    personalDetailsStep: {
      images: [
        { src: null, loading: false, name: null },
        { src: null, loading: false, name: null },
        { src: null, loading: false, name: null },
        { src: null, loading: false, name: null },
      ],
    },
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

    case SET_GURU_PHOTOS:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          personalDetailsStep: {
            ...state.becomeGuruModal.personalDetailsStep,
            images: action.images,
          },
        },
      };

    default:
      return state;
  }
};
