export const SET_HITS = 'SET_HITS';
export const SET_APPLICATIONS_LOADING = 'SET_APPLICATIONS_LOADING';
export const SET_TOTAL_APPLICATIONS_COUNT = 'SET_TOTAL_APPLICATIONS_COUNT';
export const SET_PAGE = 'SET_PAGE';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_QUERY = 'SET_QUERY';
export const TOGGLE_APPLICATIONS_MODAL = 'TOGGLE_APPLICATIONS_MODAL';

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

export const setQuery = (query) => ({
  type: SET_QUERY,
  query,
});

export const toggleApplicationsModal = (open, selectedHit) => ({
  type: TOGGLE_APPLICATIONS_MODAL,
  open,
  selectedHit,
});
