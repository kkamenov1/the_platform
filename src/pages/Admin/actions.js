export const SET_APPLICATIONS = 'SET_APPLICATIONS';
export const TOGGLE_APPLICATION_VISIBILITY = 'TOGGLE_APPLICATION_VISIBILITY';
export const SET_APPLICATIONS_LOADING = 'SET_APPLICATIONS_LOADING';
export const SET_TOTAL_APPLICATIONS_COUNT = 'SET_TOTAL_APPLICATIONS_COUNT';
export const SET_PAGE = 'SET_PAGE';
export const SET_ROWS_PER_PAGE = 'SET_ROWS_PER_PAGE';

export const setApplications = (applications) => ({
  type: SET_APPLICATIONS,
  applications,
});

export const toggleApplicationVisibility = (applications) => ({
  type: TOGGLE_APPLICATION_VISIBILITY,
  applications,
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

export const setRowsPerPage = (rowsPerPage) => ({
  type: SET_ROWS_PER_PAGE,
  rowsPerPage,
});
