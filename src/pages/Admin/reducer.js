import {
  SET_APPLICATIONS,
  SET_APPLICATIONS_LOADING,
  SET_TOTAL_APPLICATIONS_COUNT,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_SELECTED_APPLICATIONS,
} from './actions';

import { APPLICATIONS_PER_PAGE1 } from '../../constants/adminPanel';


export const defaultStore = {
  applications: [],
  loading: false,
  count: null,
  page: 0,
  rowsPerPage: APPLICATIONS_PER_PAGE1,
  selectedApplications: [],
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_APPLICATIONS:
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

    case SET_SELECTED_APPLICATIONS:
      return {
        ...state,
        selectedApplications: action.selectedApplications,
      };

    default:
      return state;
  }
};
