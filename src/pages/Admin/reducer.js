import { SET_APPLICATIONS, TOGGLE_APPLICATION_VISIBILITY } from './actions';

export const defaultStore = {
  applications: {},
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

    default:
      return state;
  }
};
