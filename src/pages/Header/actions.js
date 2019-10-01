export const TOGGLE_MOBILE_NAVIGATION = 'TOGGLE_MOBILE_NAVIGATION'

export const toggleMobileNavigation = (open) => {
  return {
    type: TOGGLE_MOBILE_NAVIGATION,
    open
  }
}
