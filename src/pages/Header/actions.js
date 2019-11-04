export const TOGGLE_MOBILE_NAVIGATION = 'TOGGLE_MOBILE_NAVIGATION';
export const TOGGLE_HEADER_MODAL = 'TOGGLE_HEADER_MODAL';
export const SET_LOADING_SIGNUP_MODAL = 'SET_LOADING_SIGNUP_MODAL';
export const SET_LOADING_SIGNIN_MODAL = 'SET_LOADING_SIGNIN_MODAL';
export const SET_LOADING_RESET_PASSWORD_MODAL = 'SET_LOADING_RESET_PASSWORD_MODAL';
export const SET_GURU_PHOTOS = 'SET_GURU_PHOTOS';
export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const SET_APPLICATION_UID = 'SET_APPLICATION_UID';
export const SET_GURU_LOCATION = 'SET_GURU_LOCATION';
export const SET_PERSONAL_DETAILS_INPUT_VALUES = 'SET_PERSONAL_DETAILS_INPUT_VALUES';
export const SET_PERSONAL_DETAILS_ERRORS = 'SET_PERSONAL_DETAILS_ERRORS';

export const toggleMobileNavigation = (open) => ({
  type: TOGGLE_MOBILE_NAVIGATION,
  open,
});

export const toggleHeaderModal = (open, modalName) => ({
  type: TOGGLE_HEADER_MODAL,
  open,
  modalName,
});

export const setLoadingSignUpModal = (loading) => ({
  type: SET_LOADING_SIGNUP_MODAL,
  loading,
});

export const setLoadingSignInModal = (loading) => ({
  type: SET_LOADING_SIGNIN_MODAL,
  loading,
});

export const setLoadingResetPasswordModal = (loading) => ({
  type: SET_LOADING_RESET_PASSWORD_MODAL,
  loading,
});

export const setGuruImages = (images) => ({
  type: SET_GURU_PHOTOS,
  images,
});

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

export const setPersonalDetailsInputValues = (name, value) => ({
  type: SET_PERSONAL_DETAILS_INPUT_VALUES,
  name,
  value,
});

export const setPersonalDetailsErrors = (errors) => ({
  type: SET_PERSONAL_DETAILS_ERRORS,
  errors,
});
