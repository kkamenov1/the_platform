export const SET_APPLICATIONS = 'SET_APPLICATIONS';
export const TOGGLE_APPLICATION_VISIBILITY = 'TOGGLE_APPLICATION_VISIBILITY';

export const setApplications = (applications) => ({
  type: SET_APPLICATIONS,
  applications,
});

export const toggleApplicationVisibility = (applicationUID, open) => ({
  type: TOGGLE_APPLICATION_VISIBILITY,
  applicationUID,
  open,
});
