import { SET_GURU } from './actions';

export const defaultStore = {
  guru: null,
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
