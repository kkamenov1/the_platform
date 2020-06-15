export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const SET_FORM_VALUES = 'SET_FORM_VALUES';
export const SET_SUBMIT_APPLICATION_LOADING = 'SET_SUBMIT_APPLICATION_LOADING';
export const SET_GENERAL_FORM_ERROR = 'SET_GENERAL_FORM_ERROR';
export const SET_INCREASING_STEPS = 'IS_INCREASING_STEPS';

export const setActiveStep = (activeStep) => ({
  type: SET_ACTIVE_STEP,
  activeStep,
});

export const setIncreasingSteps = (isIncreasingSteps) => ({
  type: SET_INCREASING_STEPS,
  isIncreasingSteps,
});

export const setSubmitApplicationLoading = (submitApplicationLoading) => ({
  type: SET_SUBMIT_APPLICATION_LOADING,
  submitApplicationLoading,
});

export const setGeneralFormError = (generalFormError) => ({
  type: SET_GENERAL_FORM_ERROR,
  generalFormError,
});
