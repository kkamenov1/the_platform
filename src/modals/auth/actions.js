export const TOGGLE_AUTH_MODAL = 'TOGGLE_AUTH_MODAL';

export const toggleAuthModal = (open, page) => ({
  type: TOGGLE_AUTH_MODAL,
  open,
  page,
});
