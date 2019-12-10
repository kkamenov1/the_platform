import {
  SET_APPLICATIONS,
  TOGGLE_APPLICATION_VISIBILITY,
  SET_APPLICATIONS_LOADING,
} from './actions';

export const defaultStore = {
  applications: {},
  loading: false,
};

export default (state = defaultStore, action) => {
  switch (action.type) {
    case SET_APPLICATIONS:
      return {
        ...state,
        applications: action.applications,
      };

    case TOGGLE_APPLICATION_VISIBILITY:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.applicationUID]: {
            ...state.applications[action.applicationUID],
            open: action.open,
          },
        },
      };

    case SET_APPLICATIONS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    default:
      return state;
  }
};
