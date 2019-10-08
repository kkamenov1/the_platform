export const TOGGLE_MOBILE_NAVIGATION = 'TOGGLE_MOBILE_NAVIGATION';
export const TOGGLE_HEADER_MODAL = 'TOGGLE_HEADER_MODAL';

export const toggleMobileNavigation = (open) => ({
  type: TOGGLE_MOBILE_NAVIGATION,
  open,
});

export const toggleHeaderModal = (open, modalName) => ({
  type: TOGGLE_HEADER_MODAL,
  open,
  modalName,
});
