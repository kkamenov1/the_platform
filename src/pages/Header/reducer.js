import { TOGGLE_MOBILE_NAVIGATION } from './actions'

export const defaultStore = {
  isMobileNavigationOpen: false
}

export default (state = defaultStore, action) => {
  switch (action.type) {
   case TOGGLE_MOBILE_NAVIGATION:
    return {
      ...state,
      isMobileNavigationOpen: action.open
    }
   default:
    return state
  }
}
