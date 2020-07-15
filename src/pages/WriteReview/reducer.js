import {
  SET_GURU,
  TOGGLE_REVIEW_GUIDELINES_MODAL,
  TOGGLE_PHOTO_REQUIREMENTS_MODAL,
  SET_FORM_STATUS,
} from './actions';
import { REVIEW_PAGE_FORM_STATUS } from '../../core/config';

export const defaultStore = {
  guru: null,
  reviewGuidelinesModalOpen: false,
  photoRequirementsModalOpen: false,
  formStatus: REVIEW_PAGE_FORM_STATUS.FORM_INITIAL,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_GURU:
      return {
        ...state,
        guru: action.guru,
      };

    case TOGGLE_REVIEW_GUIDELINES_MODAL:
      return {
        ...state,
        reviewGuidelinesModalOpen: action.open,
      };

    case TOGGLE_PHOTO_REQUIREMENTS_MODAL:
      return {
        ...state,
        photoRequirementsModalOpen: action.open,
      };

    case SET_FORM_STATUS:
      return {
        ...state,
        formStatus: action.status,
      };

    case '@@router/LOCATION_CHANGE':
      return defaultStore;

    default:
      return state;
  }
};
