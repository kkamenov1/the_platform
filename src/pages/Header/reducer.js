import {
  TOGGLE_MOBILE_NAVIGATION,
  TOGGLE_HEADER_MODAL,
  SET_LOADING_SIGNUP_MODAL,
  SET_LOADING_SIGNIN_MODAL,
  SET_LOADING_RESET_PASSWORD_MODAL,
  SET_GURU_PHOTOS,
  SET_ACTIVE_STEP,
  SET_APPLICATION_UID,
  SET_GURU_LOCATION,
  SET_FORM_VALUES,
  SET_PERSONAL_DETAILS_ERRORS,
  SET_GURU_DETAILS_COACHING_METHODS,
  SET_GURU_DETAILS_ERRORS,
  SET_RATES_ERRORS,
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
    activeStep: 0,
    applicationUID: null,
    location: '',
    languages: [],
    day: '',
    month: '',
    year: '',
    images: [
      { src: null, loading: false, name: null },
      { src: null, loading: false, name: null },
      { src: null, loading: false, name: null },
      { src: null, loading: false, name: null },
    ],
    sport: '',
    methods: [
      {
        name: 'Workout',
        selected: false,
        price: '',
      },
      {
        name: 'Nutrition plan',
        selected: false,
        price: '',
      },
      {
        name: 'Workout & Nutrition plan',
        selected: false,
        price: '',
      },
      {
        name: 'Watching exercise',
        selected: false,
        price: '',
      },
      {
        name: 'Supplement plan',
        selected: false,
        price: '',
      },
      {
        name: 'All',
        selected: false,
        price: '',
      },
    ],
    duration: '',
    introduction: '',
    certificate: {
      src: null,
      loading: false,
      name: null,
    },
    personalDetailsStepFormErrors: {},
    guruDetailsStepFormErrors: {},
    ratesStepFormErrors: {},
    isIncreasingSteps: true,
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
          images: action.images,
        },
      };

    case SET_ACTIVE_STEP:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          activeStep: action.activeStep,
        },
      };

    case SET_APPLICATION_UID:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          applicationUID: action.uid,
        },
      };

    case SET_GURU_LOCATION:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          location: action.location,
        },
      };

    case SET_PERSONAL_DETAILS_ERRORS:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          personalDetailsStepFormErrors: {
            ...action.errors,
          },
        },
      };

    case SET_FORM_VALUES:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          [action.name]: action.value,
        },
      };

    case SET_GURU_DETAILS_COACHING_METHODS:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          methods: action.methods,
        },
      };

    case SET_GURU_DETAILS_ERRORS:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          guruDetailsStepFormErrors: {
            ...action.errors,
          },
        },
      };

    case SET_RATES_ERRORS:
      return {
        ...state,
        becomeGuruModal: {
          ...state.becomeGuruModal,
          ratesStepFormErrors: {
            ...action.errors,
          },
        },
      };

    default:
      return state;
  }
};
