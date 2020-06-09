export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const SET_GURU_LOCATION = 'SET_GURU_LOCATION';
export const SET_GEO_LOCATION = 'SET_GEO_LOCATION';
export const SET_PERSONAL_DETAILS_ERRORS = 'SET_PERSONAL_DETAILS_ERRORS';
export const SET_FORM_VALUES = 'SET_FORM_VALUES';
export const SET_GURU_DETAILS_COACHING_METHODS = 'SET_GURU_DETAILS_COACHING_METHODS';
export const SET_GURU_DETAILS_ERRORS = 'SET_GURU_DETAILS_ERRORS';
export const SET_RATES_ERRORS = 'SET_RATES_ERRORS';
export const SET_SOCIAL_MEDIA_VALUE = 'SET_SOCIAL_MEDIA_VALUE';
export const SET_SUBMIT_APPLICATION_LOADING = 'SET_SUBMIT_APPLICATION_LOADING';
export const SET_GENERAL_FORM_ERROR = 'SET_GENERAL_FORM_ERROR';
export const SET_PERSONAL_DETAILS = 'SET_PERSONAL_DETAILS';

/* GURU IMAGE CONSTANTS */

export const GURU_CERTIFICATE_IMAGE_LOADING = 'GURU_CERTIFICATE_IMAGE_LOADING';
export const GURU_CERTIFICATE_IMAGE_LOADED = 'GURU_CERTIFICATE_IMAGE_LOADED';
export const GURU_CERTIFICATE_IMAGE_ADDED = 'GURU_CERTIFICATE_IMAGE_ADDED';
export const GURU_CERTIFICATE_IMAGE_REMOVED = 'GURU_CERTIFICATE_IMAGE_REMOVED';
/* END */

export const setActiveStep = (activeStep) => ({
  type: SET_ACTIVE_STEP,
  activeStep,
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

export const setSocialMediaValue = (name, value) => ({
  type: SET_SOCIAL_MEDIA_VALUE,
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

export const setGeoLocation = (geoloc) => ({
  type: SET_GEO_LOCATION,
  geoloc,
});

export const setSubmitApplicationLoading = (submitApplicationLoading) => ({
  type: SET_SUBMIT_APPLICATION_LOADING,
  submitApplicationLoading,
});

export const setGeneralFormError = (generalFormError) => ({
  type: SET_GENERAL_FORM_ERROR,
  generalFormError,
});

export const guruCertificateImageLoading = () => ({
  type: GURU_CERTIFICATE_IMAGE_LOADING,
});

export const guruCertificateImageLoaded = () => ({
  type: GURU_CERTIFICATE_IMAGE_LOADED,
});

export const guruCertificateImageAdded = (size, name, publicId) => ({
  type: GURU_CERTIFICATE_IMAGE_ADDED,
  size,
  name,
  publicId,
});

export const guruCertificateImageRemoved = () => ({
  type: GURU_CERTIFICATE_IMAGE_REMOVED,
});

export const setPersonalDetails = (data) => ({
  type: SET_PERSONAL_DETAILS,
  data,
});
