export const SET_HITS = 'SET_HITS';
export const SET_APPLICATIONS_LOADING = 'SET_APPLICATIONS_LOADING';
export const SET_TOTAL_APPLICATIONS_COUNT = 'SET_TOTAL_APPLICATIONS_COUNT';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';

export const setApplications = (hits) => ({
  type: SET_HITS,
  hits,
});

export const setApplicationsLoading = (loading) => ({
  type: SET_APPLICATIONS_LOADING,
  loading,
});

export const setTotalApplicationsCount = (count) => ({
  type: SET_TOTAL_APPLICATIONS_COUNT,
  count,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});

export const setPageSize = (pageSize) => ({
  type: SET_PAGE_SIZE,
  pageSize,
});
