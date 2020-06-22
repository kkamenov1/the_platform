// eslint-disable-next-line import/prefer-default-export
export const maxLength = (max) => (value) => (
  value?.length > max ? 'Maximum characters exceeded' : undefined
);
