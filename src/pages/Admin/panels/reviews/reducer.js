import {
  SET_REVIEWS,
  SET_REVIEWS_LOADING,
  SET_TOTAL_REVIEWS_COUNT,
  SET_PAGE_REVIEWS,
  SET_PAGE_SIZE_REVIEWS,
  SET_QUERY_REVIEWS,
} from './actions';

export const defaultStore = {
  hits: [],
  loading: false,
  count: 0,
  page: 1,
  pageSize: 8,
  query: '',
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        hits: action.hits,
      };

    case SET_REVIEWS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_TOTAL_REVIEWS_COUNT:
      return {
        ...state,
        count: action.count,
      };

    case SET_PAGE_REVIEWS:
      return {
        ...state,
        page: action.page,
      };

    case SET_PAGE_SIZE_REVIEWS:
      return {
        ...state,
        pageSize: action.pageSize,
        page: 1,
      };

    case SET_QUERY_REVIEWS:
      return {
        ...state,
        query: action.query,
        page: 1,
      };

    default:
      return state;
  }
};
