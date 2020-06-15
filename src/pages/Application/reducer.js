import {
  SET_ACTIVE_STEP,
  SET_INCREASING_STEPS,
  SET_SUBMIT_APPLICATION_LOADING,
  SET_GENERAL_FORM_ERROR,
} from './actions';

export const defaultStore = {
  submitApplicationLoading: false,
  generalFormError: null,
  activeStep: 0,
  isIncreasingSteps: true,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.activeStep,
      };
    case SET_INCREASING_STEPS:
      return {
        ...state,
        isIncreasingSteps: action.isIncreasingSteps,
      };
    case SET_SUBMIT_APPLICATION_LOADING:
      return {
        ...state,
        submitApplicationLoading: action.submitApplicationLoading,
      };
    case SET_GENERAL_FORM_ERROR:
      return {
        ...state,
        generalFormError: action.generalFormError,
      };
    default:
      return state;
  }
};
