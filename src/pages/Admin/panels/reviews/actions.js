export const SET_REVIEWS = 'SET_REVIEWS';
export const SET_REVIEWS_LOADING = 'SET_REVIEWS_LOADING';
export const SET_TOTAL_REVIEWS_COUNT = 'SET_TOTAL_REVIEWS_COUNT';
export const SET_PAGE_REVIEWS = 'SET_PAGE_REVIEWS';
export const SET_PAGE_SIZE_REVIEWS = 'SET_PAGE_SIZE_REVIEWS';
export const SET_QUERY_REVIEWS = 'SET_QUERY_REVIEWS';

export const setReviews = (hits) => ({
  type: SET_REVIEWS,
  hits,
});

export const setReviewsLoading = (loading) => ({
  type: SET_REVIEWS_LOADING,
  loading,
});

export const setTotalReviewsCount = (count) => ({
  type: SET_TOTAL_REVIEWS_COUNT,
  count,
});

export const setPageReviews = (page) => ({
  type: SET_PAGE_REVIEWS,
  page,
});

export const setPageSizeReviews = (pageSize) => ({
  type: SET_PAGE_SIZE_REVIEWS,
  pageSize,
});

export const setQueryReviews = (query) => ({
  type: SET_QUERY_REVIEWS,
  query,
});
