import {
  SET_HITS,
  SET_APPLICATIONS_LOADING,
  SET_TOTAL_APPLICATIONS_COUNT,
  SET_PAGE,
  SET_PAGE_SIZE,
  SET_QUERY,
  TOGGLE_APPLICATIONS_MODAL,
} from './actions';

export const defaultStore = {
  hits: [],
  loading: false,
  count: 0,
  page: 1,
  pageSize: 8,
  query: '',
  modalOpen: false,
  selectedHit: null,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_HITS:
      return {
        ...state,
        hits: action.hits,
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

    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
        page: 1,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.query,
        page: 1,
      };

    case TOGGLE_APPLICATIONS_MODAL:
      return {
        ...state,
        modalOpen: action.open,
        selectedHit: action.selectedHit,
      };

    default:
      return state;
  }
};
