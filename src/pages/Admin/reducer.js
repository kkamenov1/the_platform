import {
  SET_APPLICATIONS,
  TOGGLE_APPLICATION_VISIBILITY,
  SET_APPLICATIONS_LOADING,
  SET_LIMIT,
} from './actions';

import { APPLICATIONS_PER_PAGE } from '../../constants/adminPanel';

export const defaultStore = {
  applications: [],
  loading: false,
  limit: APPLICATIONS_PER_PAGE,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_APPLICATIONS:
      return {
        ...state,
        applications: action.applications,
      };

    case TOGGLE_APPLICATION_VISIBILITY:
      return {
        ...state,
        applications: action.applications,
      };

    case SET_APPLICATIONS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit,
      };

    default:
      return state;
  }
};
