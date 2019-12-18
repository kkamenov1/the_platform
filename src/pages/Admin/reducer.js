import {
  SET_APPLICATIONS,
  TOGGLE_APPLICATION_VISIBILITY,
  SET_APPLICATIONS_LOADING,
  SET_TOTAL_APPLICATIONS_COUNT,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
} from './actions';

import { APPLICATIONS_PER_PAGE1 } from '../../constants/adminPanel';


export const defaultStore = {
  applications: [],
  loading: false,
  count: null,
  page: 0,
  rowsPerPage: APPLICATIONS_PER_PAGE1,
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

    case SET_TOTAL_APPLICATIONS_COUNT:
      return {
        ...state,
        count: action.count,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.rowsPerPage,
      };

    default:
      return state;
  }
};
