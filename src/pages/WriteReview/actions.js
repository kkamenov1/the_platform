export const SET_GURU = 'SET_GURU';
export const TOGGLE_REVIEW_GUIDELINES_MODAL = 'TOGGLE_REVIEW_GUIDELINES_MODAL';
export const TOGGLE_PHOTO_REQUIREMENTS_MODAL = 'TOGGLE_PHOTO_REQUIREMENTS_MODAL';
export const SET_FORM_STATUS = 'SET_FORM_STATUS';

export const setGuru = (guru) => ({
  type: SET_GURU,
  guru,
});

export const toggleReviewGuidelinesModal = (open) => ({
  type: TOGGLE_REVIEW_GUIDELINES_MODAL,
  open,
});

export const togglePhotoRequirementsModal = (open) => ({
  type: TOGGLE_PHOTO_REQUIREMENTS_MODAL,
  open,
});

export const setFormStatus = (status) => ({
  type: SET_FORM_STATUS,
  status,
});
