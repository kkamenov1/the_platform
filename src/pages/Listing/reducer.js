import {
  SET_LOCATION,
  TOGGLE_MAP,
} from './actions';

export const defaultStore = {
  currentLocation: {},
  showMap: true,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        currentLocation: action.location,
      };

    case TOGGLE_MAP:
      return {
        ...state,
        showMap: action.show,
      };

    default:
      return state;
  }
};
