import { SET_GURU_DETAILS } from './actions';

export const defaultStore = {
  sport: '',
  introduction: '',
  certificate: {
    size: null,
    name: null,
    public_id: null,
    loading: false,
  },
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU_DETAILS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
