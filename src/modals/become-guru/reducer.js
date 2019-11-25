import {
  SET_GURU_PHOTOS,
  SET_ACTIVE_STEP,
  SET_APPLICATION_UID,
  SET_GURU_LOCATION,
  SET_FORM_VALUES,
  SET_PERSONAL_DETAILS_ERRORS,
  SET_GURU_DETAILS_COACHING_METHODS,
  SET_GURU_DETAILS_ERRORS,
  SET_RATES_ERRORS,
  CLEAR_BECOMEGURU_MODAL,
  TOGGLE_BECOME_GURU_MODAL,
} from './actions';

export const defaultStore = {
  open: false,
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
  isFormFinalized: false,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case TOGGLE_BECOME_GURU_MODAL:
      return {
        ...state,
        open: action.open,
      };

    case SET_GURU_PHOTOS:
      return {
        ...state,
        images: action.images,
      };

    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.activeStep,
      };

    case SET_APPLICATION_UID:
      return {
        ...state,
        applicationUID: action.uid,
      };

    case SET_GURU_LOCATION:
      return {
        ...state,
        location: action.location,
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

    case CLEAR_BECOMEGURU_MODAL:
      return defaultStore;

    default:
      return state;
  }
};
