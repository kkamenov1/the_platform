export const TOGGLE_MOBILE_NAVIGATION = 'TOGGLE_MOBILE_NAVIGATION'
export const TOGGLE_HEADER_MODAL = 'TOGGLE_HEADER_MODAL'

export const toggleMobileNavigation = open => {
  return {
    type: TOGGLE_MOBILE_NAVIGATION,
    open
  }
}

export const toggleHeaderModal = open => {
  return {
    type: TOGGLE_HEADER_MODAL,
    open
  }
}
