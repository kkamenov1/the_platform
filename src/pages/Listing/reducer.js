import {
  TOGGLE_MAP,
  TOGGLE_REFINEMENTS_MODAL,
} from './actions';

export const defaultStore = {
  showMap: true,
  refinementsModalOpen: false,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case TOGGLE_MAP:
      return {
        ...state,
        showMap: action.show,
      };

    case TOGGLE_REFINEMENTS_MODAL:
      return {
        ...state,
        refinementsModalOpen: action.open,
      };

    default:
      return state;
  }
};
