export const TOGGLE_MAP = 'TOGGLE_MAP';
export const TOGGLE_REFINEMENTS_MODAL = 'TOGGLE_REFINEMENTS_MODAL';

export const toggleMap = (show) => ({
  type: TOGGLE_MAP,
  show,
});

export const toggleRefinementsModal = (open) => ({
  type: TOGGLE_REFINEMENTS_MODAL,
  open,
});
