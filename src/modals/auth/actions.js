import { SIGN_IN } from '../../constants/authModalPages';

export const TOGGLE_AUTH_MODAL = 'TOGGLE_AUTH_MODAL';

export const toggleAuthModal = (open, page = SIGN_IN) => ({
  type: TOGGLE_AUTH_MODAL,
  open,
  page,
});
