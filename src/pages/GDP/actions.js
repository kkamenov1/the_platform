export const SET_GURU = 'SET_GURU';
export const SET_ACTIVE_IMAGE_INDEX = 'SET_ACTIVE_IMAGE_INDEX';

export const setGuru = (guru) => ({
  type: SET_GURU,
  guru,
});

export const setActiveImageIndex = (index) => ({
  type: SET_ACTIVE_IMAGE_INDEX,
  index,
});
