import {
  SET_ACTIVE_STEP,
  SET_GURU_LOCATION,
  SET_GEO_LOCATION,
  SET_FORM_VALUES,
  SET_PERSONAL_DETAILS_ERRORS,
  SET_GURU_DETAILS_COACHING_METHODS,
  SET_GURU_DETAILS_ERRORS,
  SET_RATES_ERRORS,
  SET_SOCIAL_MEDIA_VALUE,
  SET_SUBMIT_APPLICATION_LOADING,
  SET_GENERAL_FORM_ERROR,
  GURU_CERTIFICATE_IMAGE_LOADING,
  GURU_CERTIFICATE_IMAGE_LOADED,
  GURU_CERTIFICATE_IMAGE_ADDED,
  GURU_CERTIFICATE_IMAGE_REMOVED,
} from './actions';

export const defaultStore = {
  submitApplicationLoading: false,
  generalFormError: null,
  activeStep: 0,
  location: '',
  _geoloc: null,
  languages: [],
  birthday: '',
  image: {
    size: null,
    name: null,
    publicId: null,
    loading: false,
  },
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
  subscribers: '',
  introduction: '',
  certificate: {
    size: null,
    name: null,
    publicId: null,
    loading: false,
  },
  socialMedia: {},
  personalDetailsStepFormErrors: {},
  guruDetailsStepFormErrors: {},
  ratesStepFormErrors: {},
  isIncreasingSteps: true,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.activeStep,
      };

    case SET_GURU_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    case SET_GEO_LOCATION:
      return {
        ...state,
        _geoloc: action.geoloc,
      };

    case SET_PERSONAL_DETAILS_ERRORS:
      return {
        ...state,
        personalDetailsStepFormErrors: {
          ...action.errors,
        },
      };

    case SET_FORM_VALUES:
      return {
        ...state,
        [action.name]: action.value,
      };

    case SET_SOCIAL_MEDIA_VALUE:
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          [action.name]: action.value,
        },
      };

    case SET_GURU_DETAILS_COACHING_METHODS:
      return {
        ...state,
        methods: action.methods,
      };

    case SET_GURU_DETAILS_ERRORS:
      return {
        ...state,
        guruDetailsStepFormErrors: {
          ...action.errors,
        },
      };

    case SET_RATES_ERRORS:
      return {
        ...state,
        ratesStepFormErrors: {
          ...action.errors,
        },
      };

    case '@@router/LOCATION_CHANGE':
      return defaultStore;

    case SET_SUBMIT_APPLICATION_LOADING:
      return {
        ...state,
        submitApplicationLoading: action.submitApplicationLoading,
      };

    case SET_GENERAL_FORM_ERROR:
      return {
        ...state,
        generalFormError: action.generalFormError,
      };

    case GURU_CERTIFICATE_IMAGE_LOADING:
      return {
        ...state,
        certificate: {
          ...state.certificate,
          loading: true,
        },
      };

    case GURU_CERTIFICATE_IMAGE_LOADED:
      return {
        ...state,
        certificate: {
          ...state.certificate,
          loading: false,
        },
      };

    case GURU_CERTIFICATE_IMAGE_ADDED:
      return {
        ...state,
        certificate: {
          ...state.certificate,
          size: action.size,
          name: action.name,
          publicId: action.publicId,
        },
      };

    case GURU_CERTIFICATE_IMAGE_REMOVED:
      return {
        ...state,
        certificate: {
          ...state.certificate,
          size: null,
          name: null,
          publicId: null,
        },
      };

    default:
      return state;
  }
};
