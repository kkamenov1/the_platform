import { TOGGLE_MAP } from './actions';

export const defaultStore = {
  currentLocation: {},
  showMap: true,
};

export default (state = defaultStore, action) => {
  switch (action.type) {

    case TOGGLE_MAP:
      return {
        ...state,
        showMap: action.show,
      };

    default:
      return state;
  }
};
