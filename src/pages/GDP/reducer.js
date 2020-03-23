import { SET_GURU, SET_ACTIVE_IMAGE_INDEX } from './actions';

export const defaultStore = {
  guru: null,
  activeImageIndex: 0,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU:
      return {
        ...state,
        guru: action.guru,
      };

    case SET_ACTIVE_IMAGE_INDEX:
      return {
        ...state,
        activeImageIndex: action.index,
      };

    default:
      return state;
  }
};
