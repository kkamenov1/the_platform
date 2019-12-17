import {
  SET_APPLICATIONS,
  TOGGLE_APPLICATION_VISIBILITY,
  SET_APPLICATIONS_LOADING,
  SET_MAX_PAGE,
  SET_PAGE_NUMBER,
} from './actions';


export const defaultStore = {
  applications: [],
  loading: false,
  maxPage: null,
  pageNumber: 1,
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

    case SET_MAX_PAGE:
      return {
        ...state,
        maxPage: action.maxPage,
      };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber,
      };

    default:
      return state;
  }
};
