export const SET_LOCATION = 'SET_LOCATION';
export const TOGGLE_MAP = 'TOGGLE_MAP';

export const setLocation = (location) => ({
  type: SET_LOCATION,
  location,
});

export const toggleMap = (show) => ({
  type: TOGGLE_MAP,
  show,
});
