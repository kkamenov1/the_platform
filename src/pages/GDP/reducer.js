import { SET_GURU, SET_GURU_LOADING } from './actions';

export const defaultStore = {
  guru: {
    images: [],
    birthday: '',
    sport: '',
    isAdmin: false,
    duration: '',
    userID: '',
    isGuru: true,
    methods: [],
    email: '',
    languages: [],
    _geoloc: null,
    photoURL: '',
    location: '',
    displayName: '',
    introduction: null,
    certificate: '',
    hasSubmittedApplication: false,
    priceFrom: 0,
  },
  loading: false,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU:
      return {
        ...state,
        guru: action.guru,
      };

    case SET_GURU_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};
