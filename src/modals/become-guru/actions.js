export const SET_GURU_PHOTOS = 'SET_GURU_PHOTOS';
export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const SET_APPLICATION_UID = 'SET_APPLICATION_UID';
export const SET_GURU_LOCATION = 'SET_GURU_LOCATION';
export const SET_GEO_LOCATION = 'SET_GEO_LOCATION';
export const SET_PERSONAL_DETAILS_ERRORS = 'SET_PERSONAL_DETAILS_ERRORS';
export const SET_FORM_VALUES = 'SET_FORM_VALUES';
export const SET_GURU_DETAILS_COACHING_METHODS = 'SET_GURU_DETAILS_COACHING_METHODS';
export const SET_GURU_DETAILS_ERRORS = 'SET_GURU_DETAILS_ERRORS';
export const SET_RATES_ERRORS = 'SET_RATES_ERRORS';
export const CLEAR_BECOMEGURU_MODAL = 'CLEAR_BECOMEGURU_MODAL';
export const TOGGLE_BECOME_GURU_MODAL = 'TOGGLE_BECOME_GURU_MODAL';
export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';

export const setActiveStep = (activeStep) => ({
  type: SET_ACTIVE_STEP,
  activeStep,
});

export const setApplicationUID = (uid) => ({
  type: SET_APPLICATION_UID,
  uid,
});

export const setGuruLocation = (location) => ({
  type: SET_GURU_LOCATION,
  location,
});

export const setPersonalDetailsErrors = (errors) => ({
  type: SET_PERSONAL_DETAILS_ERRORS,
  errors,
});

export const setFormValues = (name, value) => ({
  type: SET_FORM_VALUES,
  name,
  value,
});

export const setGuruDetailsCoachingMethods = (methods) => ({
  type: SET_GURU_DETAILS_COACHING_METHODS,
  methods,
});

export const setGuruDetailsErrors = (errors) => ({
  type: SET_GURU_DETAILS_ERRORS,
  errors,
});

export const setRatesErrors = (errors) => ({
  type: SET_RATES_ERRORS,
  errors,
});

export const clearBecomeGuruModal = () => ({
  type: CLEAR_BECOMEGURU_MODAL,
});

export const toggleBecomeGuruModal = (open) => ({
  type: TOGGLE_BECOME_GURU_MODAL,
  open,
});

export const setGeoLocation = (geoloc) => ({
  type: SET_GEO_LOCATION,
  geoloc,
});

export const setImageUploadOnSuccess = (resultInfo) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  info: resultInfo,
});
