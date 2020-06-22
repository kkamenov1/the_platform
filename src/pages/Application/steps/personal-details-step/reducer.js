import { SET_PERSONAL_DETAILS } from './actions';

export const defaultStore = {
  location: '',
  _geoloc: null,
  languages: [],
  birthday: '',
  image: {
    size: null,
    name: null,
    public_id: null,
    loading: false,
  },
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_PERSONAL_DETAILS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
