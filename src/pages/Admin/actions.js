export const SET_APPLICATIONS = 'SET_APPLICATIONS';
export const TOGGLE_APPLICATION_VISIBILITY = 'TOGGLE_APPLICATION_VISIBILITY';
export const SET_APPLICATIONS_LOADING = 'SET_APPLICATIONS_LOADING';
export const SET_LIMIT = 'SET_LIMIT';

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

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  limit,
});
