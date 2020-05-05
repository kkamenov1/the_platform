import { SET_GURU } from './actions';

export const defaultStore = {
  guru: {
    image: '',
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
    priceFrom: 0,
    available: undefined,
    occupation: undefined,
    subscribers: '',
    socialMedia: null,
  },
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU:
      return {
        ...state,
        guru: action.guru,
      };

    default:
      return state;
  }
};
