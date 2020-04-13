export const SET_GURU = 'SET_GURU';
export const SET_GURU_LOADING = 'SET_GURU_LOADING';

export const setGuru = (guru) => ({
  type: SET_GURU,
  guru,
});

export const setGuruLoading = (loading) => ({
  type: SET_GURU_LOADING,
  loading,
});
